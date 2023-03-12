// user.[uid].tsx

import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { api } from "../../utils/api";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from 'react-query';

// nextjs page
// show user.name, user.email, user.avatar
// allow to create book by using api.book.create
// make form to create book

export default function User() {
    const { data: sessionData } = useSession();
    const id = sessionData?.user.id;
    const { data: user } = api.user.get.useQuery(id);
    const { data: books } = api.book.getByUser.useQuery(id);
    const [editProfile, setEditProfile] = useState<boolean>(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const createByUser = api.book.createByUser.useMutation();

    const onSubmit = data => {
        console.log(data);
        if (data.book) {
            createByUser.mutate(
                {title: data.book, publisher: data.publisher},
                {enabled: sessionData?.user !== undefined},
            );
        }
    }

    return (
        <div>
            <div>
                {user?.name}
            </div>
            <div>
                {user?.email}
            </div>
            {/* <img src={{user?.image}} /> */}
            <div>
                {books?.map((book) => (
                    <li key={book.id} className="text-white">
                        <div className="text-xl">{book.title}</div>
                        <div className="">{book.publisher}</div>
                    </li>
                ))}
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="title" {...register("book")} />
                    <input type="text" placeholder="publisher" {...register("publisher")} />
                    <input type="submit" />
                </form>
            </div>
        </div>

    )

}

