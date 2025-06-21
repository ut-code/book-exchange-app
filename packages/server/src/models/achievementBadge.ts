import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

export enum BadgeType {
  FIRST_EXCHANGE = 'FIRST_EXCHANGE',
  FIVE_EXCHANGES = 'FIVE_EXCHANGES',
  TEN_EXCHANGES = 'TEN_EXCHANGES',
  TWENTY_FIVE_EXCHANGES = 'TWENTY_FIVE_EXCHANGES',
  FIFTY_EXCHANGES = 'FIFTY_EXCHANGES',
  HUNDRED_EXCHANGES = 'HUNDRED_EXCHANGES',
  PERFECT_RATING = 'PERFECT_RATING',
  HELPFUL_REVIEWER = 'HELPFUL_REVIEWER',
  BOOK_COLLECTOR = 'BOOK_COLLECTOR',
  EARLY_ADOPTER = 'EARLY_ADOPTER',
  COMMUNITY_HELPER = 'COMMUNITY_HELPER',
}

registerEnumType(BadgeType, {
  name: 'BadgeType',
});

@ObjectType()
export class AchievementBadge {
  @Field(() => ID)
  id: string;

  @Field(() => BadgeType)
  type: BadgeType;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  iconUrl: string;

  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class UserAchievement {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  badgeId: string;

  @Field(() => AchievementBadge)
  badge: AchievementBadge;

  @Field()
  earnedAt: Date;

  @Field()
  createdAt: Date;
}