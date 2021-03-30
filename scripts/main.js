console.log('yum, yum, yum');

import { LoginForm } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";
import { NavBar } from "./nav/NavBar.js";
import { populateToppings, renderToppings } from "./nav/NavBar.js";
import { SnackList } from "./snacks/SnackList.js";
import { SnackDetails } from "./snacks/SnackDetails.js";
import { Footer } from "./nav/Footer.js";
import { addType } from "./snacks/type.js";
import { addTopping } from "./snacks/topping.js";
import { addToppingEdit } from "./snacks/toppingEdit.js";
import {
	logoutUser, setLoggedInUser, loginUser, registerUser, 
	getSnacks, getSingleSnack, getSnackByTopping, getSnackToppings, 
	registerType, registerTopping, updateTopping
} from "./data/apiManager.js";



const applicationElement = document.querySelector("#ldsnacks");

//login/register listeners
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "login__submit") {
		//collect all the details into an object
		const userObject = {
			name: document.querySelector("input[name='name']").value,
			email: document.querySelector("input[name='email']").value
		}
		loginUser(userObject)
			.then(dbUserObj => {
				if (dbUserObj) {
					sessionStorage.setItem("user", JSON.stringify(dbUserObj));
					startLDSnacks();
				} else {
					//got a false value - no user
					const entryElement = document.querySelector(".entryForm");
					entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
				}
			})
	} else if (event.target.id === "register__submit") {
		//collect all the details into an object
		const userObject = {
			name: document.querySelector("input[name='registerName']").value,
			email: document.querySelector("input[name='registerEmail']").value,
			admin: false
		}
		registerUser(userObject)
			.then(dbUserObj => {
				sessionStorage.setItem("user", JSON.stringify(dbUserObj));
				startLDSnacks();
			})
	}
})

applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
		logoutUser();
		sessionStorage.clear();
		checkForUser();
	}
})
// end login register listeners

// snack listeners
applicationElement.addEventListener("click", event => {
	event.preventDefault();

	if (event.target.id.startsWith("detailscake")) {
		const snackId = event.target.id.split("__")[1];
		getSingleSnack(snackId)
			.then(response => {
				showDetails(response);
			})
	}
})

applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "allSnacks") {
		showSnackList();
	}
})


const showDetails = (snackObj) => {
	const listElement = document.querySelector("#mainContent");
	listElement.innerHTML = SnackDetails(snackObj);
}
//end snack listeners

const checkForUser = () => {
	if (sessionStorage.getItem("user")) {
		setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
		startLDSnacks();
	} else {
		applicationElement.innerHTML = "";
		//show login/register
		showNavBar()
		showLoginRegister();
	}
}

const showLoginRegister = () => {
	//template strings can be used here too
	applicationElement.innerHTML += `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
}

const showNavBar = () => {
	applicationElement.innerHTML += NavBar();
}

const showSnackList = () => {
	getSnacks().then(allSnacks => {
		const listElement = document.querySelector("#mainContent")
		listElement.innerHTML = SnackList(allSnacks);
	})
}

applicationElement.addEventListener("change", event => {
	event.preventDefault();
	if (event.target.id === "toppingDropdown") {
		let snackSelector = event.target.value
		getSnackByTopping(snackSelector)
		.then(response => {
			let selectedToppingArray = [];
			response.forEach(topping => {
				selectedToppingArray.push(topping.snack)
			})
			const listElement = document.querySelector("#mainContent")
			listElement.innerHTML = SnackList(selectedToppingArray)
		})
	}
})

//adding a type
applicationElement.addEventListener("click", event => {
	if(event.target.id === "addType") {
		applicationElement.innerHTML = "";
		showNavBar();
		showTypeForm();
	}
})

applicationElement.addEventListener("click", event => {
	if(event.target.id === "typeSubmit") {
		const typeObj = {
			name: document.querySelector("#typeName").value
		}
		registerType(typeObj)
		startLDSnacks();
	}
	
})

const cancelType = () => {
	const cancelElement = document.querySelector(".container");
	cancelElement.innerHTML = startLDSnacks();
}

applicationElement.addEventListener("click", event => {
	if(event.target.id === "formCancel") {
		cancelType();
	}
})

const showTypeForm = () => {
	applicationElement.innerHTML += `${addType()}`;
	console.log(addType())
}
//adding a topping
applicationElement.addEventListener("click", event => {
	if(event.target.id === "addTopping") {
		applicationElement.innerHTML = "";
		showNavBar();
		showToppingForm();
	}
})

applicationElement.addEventListener("click", event => {
	if(event.target.id === "toppingSubmit") {
		const toppingObj = {
			name: document.querySelector("#toppingName").value
		}
		registerTopping(toppingObj)
		startLDSnacks();
	}
	
})

const showToppingForm = () => {
	applicationElement.innerHTML += `${addTopping()}`;
}
//Editting toppings

// applicationElement.addEventListener("change", event => {
// 	event.preventDefault();
// 	if (event.target.id === "toppingEditDropdown") {
// 		let snackEditSelector = event.target.value
// 		getSnackByTopping(snackEditSelector)
// 		.then(response => {
// 			let selectedEditToppingArray = [];
// 			response.forEach(topping => {
// 				selectedEditToppingArray.push(topping.snack)
// 			})
// 			const listElement = document.querySelector("#mainContent")
// 			listElement.innerHTML = SnackList(selectedToppingArray)
// 		})
// 	}
// })

applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("editSubmit")) {
	  const toppingId = event.target.id.split("__")[1];
	  //collect all the details into an object
	  const name = document.querySelector("input[name='toppingEditName']").value

	  const toppingObject = {
		name: name,
		id: parseInt(toppingId)
	  }
	  
	  updateTopping(toppingObject)
		.then(response => {
			showSnackList();
		})
	}
  })

applicationElement.addEventListener("click", event => {
	if(event.target.id === "toppingEdit") {
		applicationElement.innerHTML = "";
		showNavBar();
		showToppingEditForm();
	}
})

applicationElement.addEventListener("click", event => {
	if(event.target.id === "editSubmit") {
		const toppingObj = {
			name: document.querySelector("#toppingName").value
		}
		registerTopping(toppingObj)
		startLDSnacks();
	}
	
})

const showToppingEditForm = () => {
	applicationElement.innerHTML += `${addToppingEdit()}`;
}

//show footer
const showFooter = () => {
	applicationElement.innerHTML += Footer();
}

const startLDSnacks = () => {
	getSnackToppings()
	.then(() => {
		applicationElement.innerHTML = "";
		showNavBar();
		applicationElement.innerHTML += `<div id="mainContent"></div>`;
		showSnackList();
		showFooter();
		populateToppings();
	})
	
}

checkForUser();
