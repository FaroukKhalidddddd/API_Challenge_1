"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Converts a Person object into an HTML UserCard and appends it to the CardsSection.
 * @param person The Person object containing userId for unique identification.
 */
function ConvertUserCardToHTML(person) {
    // const posts = getPosts();
    let CardsSection = (document.querySelector("body .Parent .CardsSection"));
    let User = `
          <div class="UserCard" id="${person.userId}">
            <h3 class="UserId">User Id : ${person.userId}</h3>
            <h3 class="Email">User_[${person.userId}]_@gmail.com</h3>
          </div>
        `;
    CardsSection.innerHTML += User;
}
/**
 * Clears the inner HTML content of the PostsSection.
 * Useful for resetting or preparing the PostsSection for new content.
 */
function ClearPostSetion() {
    let PostsSection = document.querySelector(".PostsSection");
    if (PostsSection) {
        PostsSection.innerHTML = " ";
    }
}
/**
 * Resets the border styles of all UserCards in the CardsSection.
 * @param List An array of Person objects, not directly used in the function logic.
 */
function ResetBorder(List) {
    // Loop through each Person object (though not used directly in this function)
    List.forEach((element) => {
        // Select all UserCards within the CardsSection
        let Cards = document.querySelectorAll("body .Parent .CardsSection .UserCard ");
        // Apply default border styles to each UserCard
        Cards.forEach((element) => {
            element.style.borderColor = "Transparent";
        });
    });
}
/**
 * Converts a Person object into an HTML UserPost and appends it to the PostsSection.
 * @param P The Person object containing title and body for displaying as a UserPost.
 */
function ConvertUserPostsToHTML(P) {
    // Select the PostsSection where UserPosts will be appended
    let PostsSection = (document.querySelector("body .Parent .PostsSection"));
    // Create HTML markup for the UserPost
    let Post = `
    <div class="UserPost" id="${P.userId}">
      <h3 class="Title">${P.title}</h3>
      <h3 class="Body">${P.body}</h3>
    </div>
  `;
    // Append the UserPost HTML to the PostsSection
    PostsSection.innerHTML += Post;
}
/**
 * Fetches a list of persons from a remote API endpoint asynchronously.
 * @returns A Promise resolving to an array of Person objects fetched from the API.
 *          If there's an error during fetching or parsing, an empty array is returned.
 */
function fetchPersons() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://jsonplaceholder.typicode.com/posts");
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error("Error fetching data:", error);
            return []; // or handle error as appropriate
        }
    });
}
/**
 * Filters an array of persons to return only unique objects based on userId.
 * @param persons An array of Person objects.
 * @returns An array of unique Person objects based on userId.
 */
function UniqueObjects(persons) {
    // Initialize a Set to keep track of seen userIds
    let seenUserIds = new Set();
    // Filter the persons array to keep only unique objects based on userId
    persons = persons.filter((obj) => {
        // If the userId is not seen before, add it to the Set and return true
        if (!seenUserIds.has(obj.userId)) {
            seenUserIds.add(obj.userId);
            return true;
        }
        // If the userId is already seen, return false to filter out the object
        return false;
    });
    // Return the filtered array of unique Person objects
    return persons;
}
// Start Main Code
//--------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    fetchPersons().then((persons) => {
        let Persons = persons;
        let _UniqueObjects = UniqueObjects(Persons);
        _UniqueObjects.forEach((element) => {
            ConvertUserCardToHTML(element);
        });
        // Add event listeners to dynamically created UserCard elements
        let UserCards = document.querySelectorAll(`body .Parent .CardsSection .UserCard`);
        UserCards.forEach((card) => {
            card.style.backgroundColor = "#000";
            card.style.color = "#FFFFFF";
            card.addEventListener("click", function (e) {
                ClearPostSetion();
                ResetBorder(_UniqueObjects);
                Persons.forEach((element) => {
                    if (element.userId.toString() === card.id) {
                        card.style.borderColor = "#FF0000";
                        ConvertUserPostsToHTML(element);
                    }
                });
                console.log(`User<${card.id}> Clicked`);
            });
        });
    });
});
//--------------------------------------
// End Main Code
