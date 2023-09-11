import { FieldNode, GraphQLResolveInfo, SelectionSetNode } from 'graphql';

type AvailableRelations<Parent> = Partial<{
  [P in keyof Parent]: AvailableRelations<
    Parent[P] extends (infer U)[] ? U : Parent[P]
  >;
}>;

function getRequestedRelationsRecursively<T>(
  selectionSet: SelectionSetNode,
  availableRelations: AvailableRelations<T>,
): string[] {
  return Object.entries(availableRelations).flatMap(([key, value]) =>
    selectionSet.selections.flatMap((node) =>
      node.kind === 'Field' &&
      node.selectionSet &&
      node.name.value === key &&
      typeof value === 'object' &&
      value
        ? [
            key,
            ...getRequestedRelationsRecursively(node.selectionSet, value).map(
              (relation) => `${key}.${relation}`,
            ),
          ]
        : [],
    ),
  );
}

export function getRequestedRelations<T>(
  info: GraphQLResolveInfo,
  availableRelations: AvailableRelations<T>,
  isPaginated = false,
): string[] {
  const selectionSet = info.fieldNodes[0]?.selectionSet;
  if (!selectionSet) return [];
  if (!isPaginated)
    return getRequestedRelationsRecursively(selectionSet, availableRelations);

  const bareSelectionSet = selectionSet.selections.find(
    (selection): selection is FieldNode =>
      selection.kind === 'Field' && selection.name.value === 'data',
  )?.selectionSet;
  if (!bareSelectionSet) return [];
  return getRequestedRelationsRecursively(bareSelectionSet, availableRelations);
}

export function mapRelationsToPrismaInclude(relations: string[]): any {
  return relations.reduce((acc, relation) => {
    const parts = relation.split('.');
    let lastObject = acc;
    for (let part of parts) {
      if (!lastObject[part]) {
        lastObject[part] = {};
      }
      lastObject = lastObject[part];
    }
    return acc;
  }, {});
}
