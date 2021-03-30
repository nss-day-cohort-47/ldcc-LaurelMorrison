import { useSnackToppingsCollection, getSnackToppings } from "../data/apiManager.js"


export const renderEditToppings = () => {
	const toppingEditList = useSnackToppingsCollection();
	let toppingEditOptions = toppingEditList.map(singleTopping => {
		return `<option value="${singleTopping.id}">${singleTopping.name}</option>`
	})
	return toppingEditOptions.join
}

export const populateEditToppings = () => {
	getSnackToppings()
		.then(() => {
			const selectEditTopping = useSnackToppingsCollection()
			renderEditToppings(selectEditTopping);
		})
}
export const addToppingEdit = () => {
    return `
    <div class="toppingEditContainer"
        <form class="toppingEditForm">
            <h2>Pick a topping to edit:</h2>
            <div class ="EditDropdown btn btn-info" aria-label="Select A Topping">
			<select id="toppingEditDropdown" class ="btn-info toppingEditDropdown"><option value=0>Select A Topping</option>${renderEditToppings()}</select>
			</div>
            <label for="editToppingName">Edit Topping Name: </label>
            <input type="text" name="toppingEditName" id="toppingEditName">
            <input type="hidden" value="" name="postId">
            <button type="button" class="btn btn-sm btn-outline-secondary btn-form" id="editSubmit">Submit</button>
            <button type="button" class="btn btn-sm btn-outline-secondary btn-form" id="formCancel">Cancel</button>
        </form>
    </div>    
    `}