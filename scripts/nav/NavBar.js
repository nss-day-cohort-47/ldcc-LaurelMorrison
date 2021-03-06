import { getLoggedInUser, useSnackToppingsCollection, getSnackToppings } from "../data/apiManager.js"

export const renderToppings = () => {
	const toppingList = useSnackToppingsCollection();
	let toppingOptions = toppingList.map(singleTopping => {
		return `<option value="${singleTopping.id}">${singleTopping.name}</option>`
	})
	return toppingOptions.join
}

export const populateToppings = () => {
	getSnackToppings()
		.then(() => {
			const selectTopping = useSnackToppingsCollection()
			renderToppings(selectTopping);
		})
}

export const NavBar = () => {
	//only show navItems and addTypeButton if user is logged in

	const navItems = getLoggedInUser().id ? `
	<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse" id="navbarSupportedContent">
	<ul class="navbar-nav me-auto mb-2 mb-lg-0">
		<li class="nav-item ms-1">
			<button class="btn btn-info" type="button" id="allSnacks">All Snacks</button>
		</li>
		<li class="nav-item ms-1">
			<div class ="toppingDropdown btn btn-info" aria-label="Select A Topping">
			<select id="toppingDropdown" class ="btn-info toppingDropdown"><option value=0>Select A Topping</option>${renderToppings()}</select>
			</div>
		</li>
		<li class="nav-item ms-1">
			<button class="btn btn-info" type="button" id="logout">Logout</button>
		</li>
	</ul>
	</div>` : ""

	const TypeButton = getLoggedInUser().id ? `
	<nav class="navbar navbar-light"">
		<div class="container-fluid">
			<button id="addType"class="btn btn-outline-primary" type="button">Add A Type</button>
		
		</div>
	</nav>` : ""

	const ToppingButton = getLoggedInUser().id ? `
	<nav class="navbar navbar-light"">
		<div class="container-fluid">
			<button id="addTopping"class="btn btn-outline-primary" type="button">Add A Topping</button>
		
		</div>
	</nav>` : ""

	const SnackButton = getLoggedInUser().id ? `
	<nav class="navbar navbar-light"">
		<div class="container-fluid">
			<button id="addSnack"class="btn btn-outline-primary" type="button">Add A Snack</button>
		
		</div>
	</nav>` : ""

	if(getLoggedInUser().admin === true) {
		return `
		<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
			  <div class="container-fluid">
			  <span class="navbar-brand mb-0 h1">LDCC
				  <span class="navbar-text">Little Debbie Collector Club</span>
			  </span>
			${navItems}
			  </div>
		</nav><div class="buttonHeaders">
		${TypeButton}
		${ToppingButton}
		${SnackButton}
		</div>
		`
	} else {
		return `
		<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
			  <div class="container-fluid">
			  <span class="navbar-brand mb-0 h1">LDCC
				  <span class="navbar-text">Little Debbie Collector Club</span>
			  </span>
			${navItems}
			  </div>
		</nav>`
	}
}