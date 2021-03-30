export const addTopping = () => {
    return `
    <div class="toppingContainer"
        <form class="toppingForm">
            <h2>Add a new snack topping:</h2>
            <label for="toppingName">Topping Name: </label>
            <input type="text" name="toppingName" id="toppingName">
            <button type="button" class="btn btn-sm btn-outline-secondary btn-form" id="toppingSubmit">Submit</button>
            <button type="button" class="btn btn-sm btn-outline-secondary btn-form" id="toppingEdit">Edit</button>
            <button type="button" class="btn btn-sm btn-outline-secondary btn-form" id="formCancel">Cancel</button>
        </form>
    </div>    
    `}