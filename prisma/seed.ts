import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
    const kokhayas = await prisma.user.create({
        data: {
            email: '1234.884.koki@gmail.com',
            name: 'kokhayas',
        }
    })
// https://www.googleapis.com/books/v1/volumes?q=Go%E8%A8%80%E8%AA%9E%E3%81%A7%E4%BD%9C%E3%82%8B%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%97%E3%83%AA%E3%82%BF
    const algo_book = await prisma.book.create({
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
                                id: kokhayas.id,
                            }
                        }
                    }
                ]
            }
        }
    })


    const hakataramen = await prisma.user.upsert({
        where: {
            email: '1234hakataramen@g.ecc.u-tokyo.ac.jp'
        },
        update: {},
        create: {
            email: '1234hakataramen@g.ecc.u-tokyo.ac.jp',
            name: 'hakataramen',
        }
    })


    if (!hakataramen) {
        throw new Error('user not found')
    }

    const golang_book = await prisma.book.create({
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
                                id: hakataramen.id,
                            }
                        }
                    }
                ]
            }
        }
    })


    const deeplearning_book = await prisma.book.create({
        data: {
            title: 'ゼロから作るDeep Learning 4',
            authors: ['斎藤 康毅'],
            publisher: 'オライリージャパン',
            language: 'ja',
            description: '本書は、ディープラーニングの基礎をゼロから学ぶことができる、オライリー・ジャパンの人気シリーズ「ゼロから作る」の第4弾です。本書では、ディープラーニングの基礎をゼロから学ぶことができます。本書では、ディープラーニングの基礎をゼロから学ぶことができます。',
            thumbnail: 'https://www.oreilly.co.jp/books/images/picture_large978-4-87311-975-5.jpeg',
            ISBN_13: '978-4-87311-975-5',
            users: {
                create: [
                    { 
                        user: {
                            connect: {
                                id: hakataramen.id,
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
                    id: hakataramen.id,
                }
            },
            addressee: {
                connect: {
                    id: kokhayas.id,
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
                    id: hakataramen.id,
                }
            },
            addressee: {
                connect: {
                    id: kokhayas.id,
                }
            },
            status: 'accepted'
        }
    })

    const kokhayas_algo_book = await prisma.userBooks.findFirst({
        where: {
            user: {
                id: kokhayas.id
            },
            book: {
                id: algo_book.id
            }
        }
    })

    if (!kokhayas_algo_book) {
        throw new Error('userBook not found')
    }

    const userBookFav1 = await prisma.userBookFav.create({
        data: {
            user: {
                connect: {
                    id: kokhayas.id,
                }
            },
            userBook: {
                connect: {
                    id: kokhayas_algo_book.id,
                }
            }
        }
    })

    const bookFav1 = await prisma.bookFav.create({
        data: {
            user: {
                connect: {
                    id: hakataramen.id,
                }
            },
            book: {
                connect: {
                    id: algo_book.id,
                }
            }
        }
    })


    const exchangeRequest1 = await prisma.exchangeRequest.create({
        data: {
            requester: {
                connect: {
                    id: hakataramen.id,
                }
            },
            addressee: {
                connect: {
                    id: kokhayas.id,
                }
            },
            requester_books: {
                connect: {
                    id: golang_book.id,
                }
            },
            addressee_books: {
                connect: {
                    id: algo_book.id,
                }
            },


            status: 'requested'
        }
    })
    // status: Union(requested, accepted, declined, blocked)

    const exchangeRequest2 = await prisma.exchangeRequest.create({
        data: {
            requester: {
                connect: {
                    id: kokhayas.id,
                }
            },
            addressee: {
                connect: {
                    id: hakataramen.id,
                }
            },
            requester_books: {
                connect: [
                    {id: algo_book.id},
                ]
            },
            addressee_books: {
                connect: [
                    {id: golang_book.id},
                    {id: deeplearning_book.id},
                ]
            },
            status: 'requested'
        }
    })
    const exchangeRequest3 = await prisma.exchangeRequest.create({
        data: {
            requester: {
                connect: {
                    id: kokhayas.id,
                }
            },
            addressee: {
                connect: {
                    id: hakataramen.id,
                }
            },
            requester_books: {
                connect: [
                    {id: algo_book.id},
                ]
            },
            addressee_books: {
                connect: [
                    {id: golang_book.id},
                    {id: deeplearning_book.id}
                ]
            },
            status: 'accepted'
        }
    })

    const room1 = await prisma.room.create({
        data: {
            name: 'room1',
        }
    })

    const roomMember1 = await prisma.roomMembers.create({
        data: {
            room: {
                connect: {
                    id: room1.id,
                }
            },
            user: {
                connect: {
                    id: hakataramen.id,
                }
            },            
        }
    })

    const roomMember2 = await prisma.roomMembers.create({
        data: {
            room: {
                connect: {
                    id: room1.id,
                }
            },
            user: {
                connect: {
                    id: kokhayas.id,
                }   
            },
        }
    })

    const privateMessage1 = await prisma.privateMessage.create({
        data: {
            room: {
                connect: {
                    id: room1.id,
                }
            },
            sender: {
                connect: {
                    id: hakataramen.id,
                }
            },
            content: 'hello kokhayas.',
        }
    })

    const privateMessage2 = await prisma.privateMessage.create({
        data: {
            room: {
                connect: {
                    id: room1.id,
                }
            },
            sender: {
                connect: {
                    id: kokhayas.id,
                }
            },
            content: 'what\'s up? hakataramen?',
        }
    })

    const publicMessage1 = await prisma.publicMessage.create({
        data: {
            sender: {
                connect: {
                    id: hakataramen.id,
                }
            },
            content: 'hello world',
        }
    })
            

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