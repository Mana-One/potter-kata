export const SINGLE_PRICE = 8;

export type Book = 1 | 2 | 3 |4 | 5;

export const UNIQUE_BOOKS_DISCOUNT = new Map<number, number>([
    [1, 0],
    [2, 0.05],
    [3, 0.1],
    [4, 0.2],
    [5, 0.25]
]);

abstract class MyError extends Error {
    constructor(message: string)
    {
        super(message);
        this.name = new.target.name;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}

class PricingError extends MyError {
    constructor() 
    {
        super("Could not calculate price");
    }
}

export function getPrice(books: Array<Book>): number 
{
    // if (books.length === 0)
    // {
    //     return 0;
    // }
    const collections = Array<Set<Book>>();

    books.forEach(b => {
        const collection = collections.find(c => !c.has(b));
        if (collection === undefined)
        {
            const uniqueExamparies = new Set<Book>()
            uniqueExamparies.add(b);
            collections.push(uniqueExamparies);
        } else 
        {
            collection.add(b);
        }
    });

    return collections.reduce((sum, c) => {
        const discount = UNIQUE_BOOKS_DISCOUNT.get(c.size);
        if (discount === undefined)
        {
            throw new PricingError();
        }
        return sum + Array
            .from(c.values())
            .reduce((acc, u) => SINGLE_PRICE * (1 - discount) + acc, 0);
    }, 0);
}