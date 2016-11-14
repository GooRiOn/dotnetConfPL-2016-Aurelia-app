define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
        }
        App.prototype.configureRouter = function (config, router) {
            this.router = router;
            config.addAuthorizeStep(AuthorizeStep);
            config.addPreActivateStep(PreActivateStep);
            config.addPreRenderStep(PreRenderStep);
            config.addPostRenderStep(PostRenderStep);
            config.map([
                { route: '', moduleId: 'books', }
            ]);
        };
        return App;
    }());
    exports.App = App;
    var AuthorizeStep = (function () {
        function AuthorizeStep() {
        }
        AuthorizeStep.prototype.run = function (navigationInstruction, next) {
            console.log("I'm inside the authorize step!");
            return next();
        };
        return AuthorizeStep;
    }());
    exports.AuthorizeStep = AuthorizeStep;
    var PreActivateStep = (function () {
        function PreActivateStep() {
        }
        PreActivateStep.prototype.run = function (navigationInstruction, next) {
            console.log("I'm inside the pre activate step!");
            return next();
        };
        return PreActivateStep;
    }());
    exports.PreActivateStep = PreActivateStep;
    var PreRenderStep = (function () {
        function PreRenderStep() {
        }
        PreRenderStep.prototype.run = function (navigationInstruction, next) {
            console.log("I'm inside the pre render step!");
            return next();
        };
        return PreRenderStep;
    }());
    exports.PreRenderStep = PreRenderStep;
    var PostRenderStep = (function () {
        function PostRenderStep() {
        }
        PostRenderStep.prototype.run = function (navigationInstruction, next) {
            console.log("I'm inside the post render step!");
            return next();
        };
        return PostRenderStep;
    }());
    exports.PostRenderStep = PostRenderStep;
});

define('books',["require", "exports"], function (require, exports) {
    "use strict";
    var BooksViewModel = (function () {
        function BooksViewModel() {
            this.books = [];
            this.newBook = new Book();
        }
        BooksViewModel.prototype.addBook = function () {
            this.books.push(this.newBook);
            this.newBook = new Book();
        };
        BooksViewModel.prototype.removeBook = function (book) {
            var bookIndex = this.books.indexOf(book);
            if (~bookIndex)
                this.books.splice(bookIndex, 1);
        };
        BooksViewModel.prototype.changeBookAvailability = function (book) {
            book.isAvailable = !book.isAvailable;
        };
        return BooksViewModel;
    }());
    exports.BooksViewModel = BooksViewModel;
    var Book = (function () {
        function Book() {
            this.isAvailable = true;
        }
        return Book;
    }());
    exports.Book = Book;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration();
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('search',["require", "exports", 'aurelia-fetch-client', 'aurelia-dependency-injection'], function (require, exports, aurelia_fetch_client_1, aurelia_dependency_injection_1) {
    "use strict";
    var SearchViewModel = (function () {
        function SearchViewModel(httpClient) {
            this.httpClient = httpClient;
            this.httpClient.configure(function (config) {
                config.withBaseUrl('http://localhost:64857/');
            });
        }
        SearchViewModel.prototype.activate = function () {
            this.bookId = 1;
            this.searchBookById();
        };
        SearchViewModel.prototype.deactivate = function () {
            alert('CYA!');
        };
        SearchViewModel.prototype.searchBookById = function () {
            var _this = this;
            var url = "api/Books/" + this.bookId;
            this.httpClient.fetch(url).then(function (response) { return response.json(); }).then(function (response) {
                _this.book = response.book;
            });
        };
        SearchViewModel = __decorate([
            aurelia_dependency_injection_1.autoinject(), 
            __metadata('design:paramtypes', [aurelia_fetch_client_1.HttpClient])
        ], SearchViewModel);
        return SearchViewModel;
    }());
    exports.SearchViewModel = SearchViewModel;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n    <router-view></router-view>\n</template>"; });
define('text!books.html', ['module'], function(module) { module.exports = "<template>\r\n    <table class=\"table\">\r\n        <tr>\r\n          <th>Title</th>\r\n          <th>Author</th>\r\n          <th>Change availability</th>\r\n          <th>Remove</th>\r\n        </tr>\r\n        <tr repeat.for=\"book of books\" class=\"${book.isAvailable? 'success' : ''}\">\r\n            <td>${book.title}</td>\r\n            <td>${book.author}</td>\r\n            <td>\r\n                <button click.trigger=\"changeBookAvailability(book)\">Change</button>\r\n            </td>\r\n            <td>\r\n                <button click.trigger=\"removeBook(book)\" if.bind=\"!book.isAvailable\">Remove</button>\r\n            </td>\r\n        </tr>\r\n    </table>\r\n\r\n    <input value.bind=\"newBook.title\">\r\n    <input value.bind=\"newBook.author\">\r\n    <button click.trigger=\"addBook()\">Add</button>\r\n</template>"; });
define('text!search.html', ['module'], function(module) { module.exports = "<template>\r\n    <p>\r\n        <img src=\"http://localhost:64857/api/Graphic/${book.graphicId}\" height=\"200px\">\r\n    </p>\r\n    <p>\r\n        <h2>${book.title}</h2>\r\n    </p>\r\n    <p>\r\n        <h3>Author: ${book.authorName} ${book.authorSurname}</h3>\r\n    </p>\r\n    <p>\r\n        <h3>Quantity: ${book.quantity}</h3>\r\n    </p>\r\n\r\n    <input type=\"number\" value.bind=\"bookId\">\r\n    <button class=\"btn btn-default\" click.trigger=\"searchBookById()\">Search</button>\r\n   \r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map