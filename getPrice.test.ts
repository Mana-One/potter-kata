import { Book, getPrice, SINGLE_PRICE, UNIQUE_BOOKS_DISCOUNT } from "./index"

describe("getPrice", () => {
    it("should return 0 when buying 0 book", () => {
        expect(getPrice([])).toBe(0);
    })

    it("should return a simple sum when buying he same book", () => {
        const books: Book[] = [ 1, 1, 1, 1, 1 ];
        expect(getPrice(books)).toBe(books.length * SINGLE_PRICE)
    })

    it("should return a 5%-discounted price when buying two different books", () => {
        const books: Book[] = [1, 2];
        expect(getPrice(books)).toBe(15.2);
    })

    it("should return a 10%-discounted price when buying 3 different books", () => {
        const books: Book[] = [1, 2, 3];
        expect(getPrice(books)).toBe(21.6);
    })

    it("should return a 20%-discounted price when buyin 4 different books", () => {
        const books: Book[] = [1, 2, 3, 4];
        expect(getPrice(books)).toBe(25.6);
    });

    it("should return a 25%-discounted price when buying all 5 books", () => {
        const books: Book[] = [1, 2, 3, 4, 5];
        expect(getPrice(books)).toBe(30);
    })

    it("should return a discounted price with one duplicate", () => {
        const books: Book[] = [1, 1, 2];
        expect(getPrice(books)).toBe(23.2);
    })

    it("should return a discounted price with multiple duplicates", () => {
        const books: Book[] = [1, 1, 2, 2];
        expect(getPrice(books)).toBe(30.4);
    })
}) 