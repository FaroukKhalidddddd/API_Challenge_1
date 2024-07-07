interface Person {
  userId: number;
  id: number;
  title: string;
  body: string;
}

/**
 * Converts a Person object into an HTML UserCard and appends it to the CardsSection.
 * @param person The Person object containing userId for unique identification.
 */
function ConvertUserCardToHTML(person: Person) {
  // const posts = getPosts();
  let CardsSection = <HTMLDivElement>(
    document.querySelector("body .Parent .CardsSection")
  );
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
function ClearPostSetion(): void {
  let PostsSection = document.querySelector<HTMLDivElement>(".PostsSection");
  if (PostsSection) {
    PostsSection.innerHTML = " ";
  }
}

/**
 * Resets the border styles of all UserCards in the CardsSection.
 * @param List An array of Person objects, not directly used in the function logic.
 */
function ResetBorder(List: Person[]): void {
  // Loop through each Person object (though not used directly in this function)
  List.forEach((element) => {
    // Select all UserCards within the CardsSection
    let Cards = document.querySelectorAll<HTMLDivElement>(
      "body .Parent .CardsSection .UserCard "
    );

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
function ConvertUserPostsToHTML(P: Person): void {
  // Select the PostsSection where UserPosts will be appended
  let PostsSection = <HTMLDivElement>(
    document.querySelector("body .Parent .PostsSection")
  );

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
async function fetchPersons(): Promise<Person[]> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data as Person[];
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // or handle error as appropriate
  }
}

/**
 * Filters an array of persons to return only unique objects based on userId.
 * @param persons An array of Person objects.
 * @returns An array of unique Person objects based on userId.
 */
function UniqueObjects(persons: Person[]): Person[] {
  // Initialize a Set to keep track of seen userIds
  let seenUserIds = new Set<number>();

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
    let Persons: Person[] = persons;

    let _UniqueObjects = UniqueObjects(Persons);

    _UniqueObjects.forEach((element) => {
      ConvertUserCardToHTML(element);
    });

    // Add event listeners to dynamically created UserCard elements
    let UserCards = document.querySelectorAll<HTMLDivElement>(
      `body .Parent .CardsSection .UserCard`
    );
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
