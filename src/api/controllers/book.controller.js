import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bookService from "../services/book.service.js";

const createBook = asyncHandler(async (req, res) => {
    // req.files will now be an object with properties 'coverImages' and 'samplePdf'
    console.log(process.env.CLOUDINARY_CLOUD_NAME);
    console.log(process.env.CLOUDINARY_API_KEY);
    console.log(process.env.CLOUDINARY_API_SECRET);
    
    const createdBook = await bookService.createBook(req.body, req.user, req.files);
    return res
        .status(201)
        .json(new ApiResponse(201, createdBook, "Book created successfully"));
});

const getAllBooks = asyncHandler(async (req, res) => {
    const books = await bookService.getAllBooks(req.query);
    return res
        .status(200)
        .json(new ApiResponse(200, books, "Books fetched successfully"));
});

const getAdminBooks = asyncHandler(async (req, res) => {
    const books = await bookService.getAdminBooks(req.query, req.user);
    return res.status(200).json(new ApiResponse(200, books, "Admin's books fetched successfully"));
});

const getBookById = asyncHandler(async (req, res) => {
    const book = await bookService.getBookById(req.params.bookId);
    return res
        .status(200)
        .json(new ApiResponse(200, book, "Book fetched successfully"));
});

const updateBookDetails = asyncHandler(async (req, res) => {
    const updatedBook = await bookService.updateBookDetails(req.params.bookId, req.body, req.user);
    return res
        .status(200)
        .json(new ApiResponse(200, updatedBook, "Book details updated successfully"));
});

const deleteBook = asyncHandler(async (req, res) => {
    await bookService.deleteBook(req.params.bookId, req.user);
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Book deleted successfully"));
});

export {
    createBook,
    getAllBooks,
    getAdminBooks,
    getBookById,
    updateBookDetails,
    deleteBook
};