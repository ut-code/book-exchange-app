import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
    const user1 = await prisma.user.create({
        data: {
            email: '1234.884.koki@gmail.com',
            name: 'user1',
        }
    })

    const book1 = await prisma.book.create({
        data: {
            title: 'プログラミングコンテスト攻略のためのアルゴリズムとデータ構造',
            authors: ['渡部有隆'],
            publisher: 'マイナビ',
            language: 'ja',
            description: 'プロコンで勝つための必須テクニック「アルゴリズム」と「データ構造」の基礎をマスター!',
            thumbnail: 'https://m.media-amazon.com/images/I/51oWwpzibRL._SX218_BO1,204,203,200_QL40_ML2_.jpg',
            ISBN_13: '978-4-8399-5295-2',
            users: {
                create: [
                    {
                        user: {
                            connect: {
                                id: user1.id,
                            }
                        }
                    }
                ]
            }
        }
    })


    // const user2 = await prisma.user.findUnique({
    //     where: {
    //         email: '1234hakataramen@g.ecc.u-tokyo.ac.jp'
    //     }
    // })
    const user2 = await prisma.user.upsert({
        where: {
            email: '1234hakataramen@g.ecc.u-tokyo.ac.jp'
        },
        update: {},
        create: {
            email: '1234hakataramen@g.ecc.u-tokyo.ac.jp',
            name: 'user2',
        }
    })

    if (!user2) {
        throw new Error('user not found')
    }

    const book2 = await prisma.book.create({
        data: {
            title: 'Go言語による並行処理',
            authors: ['Trosten Ball'],
            translators: ['松本一郎'],
            publisher: '技術評論社',
            language: 'ja',
            description: 'Go言語でつくるインタプリタは、Go言語を使ってインタプリタを作ることで、プログラミング言語の仕組みを学ぶことができる本です。本書では、Go言語を使って、インタプリタを作りながら、プログラミング言語の仕組みを学ぶことができます。',
            thumbnail: 'https://m.media-amazon.com/images/I/51sLCPa8DBL._SR600%2C315_PIWhiteStrip%2CBottomLeft%2C0%2C35_PIStarRatingFOURANDHALF%2CBottomLeft%2C360%2C-6_SR600%2C315_ZA18%2C445%2C290%2C400%2C400%2CAmazonEmberBold%2C12%2C4%2C0%2C0%2C5_SCLZZZZZZZ_FMpng_BG255%2C255%2C255.jpg',
            ISBN_13: '978-4-87311-822-2',
            users: {
                create: [
                    {
                        user: {
                            connect: {
                                id: user2.id,
                            }
                        }
                    }
                ]
            }
        }
    })



    const friendshipmentRequest1 = await prisma.friendshipRequest.create({
        data: {
            requester: {
                connect: {
                    id: user2.id,
                }
            },
            addressee: {
                connect: {
                    id: user1.id,
                }
            },
            status: 'requested'
        }
    })
    // status: Union(requested, accepted, declined, blocked)

    const friendshipmentRequest2 = await prisma.friendshipRequest.create({
        data: {
            requester: {
                connect: {
                    id: user1.id,
                }
            },
            addressee: {
                connect: {
                    id: user2.id,
                }
            },
            status: 'accepted'
        }
    })



    const exchangeRequest1 = await prisma.exchangeRequest.create({
        data: {
            requester_books: {
                connect: {
                    id: book1.id,
                }
            },
            addressee_books: {
                connect: {
                    id: book2.id,
                }
            },

            addressee: {
                connect: {
                    id: user2.id,
                }
            },
            requester: {
                connect: {
                    id: user1.id,
                }
            },
            status: 'requested'
        }
    })
    // status: Union(requested, accepted, declined, blocked)

    const exchangeRequest2 = await prisma.exchangeRequest.create({
        data: {
            requester_books: {
                connect: {
                    id: book2.id,
                }
            },
            addressee_books: {
                connect: {
                    id: book1.id,
                }
            },
            addressee: {
                connect: {
                    id: user2.id,
                }
            },
            requester: {
                connect: {
                    id: user1.id,
                }
            },
            status: 'accepted'



}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })