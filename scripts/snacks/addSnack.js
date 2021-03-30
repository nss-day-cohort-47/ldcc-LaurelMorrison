export const addTopping = () => {
    return `
    <div class="toppingContainer"
        <form class="toppingForm">
            <h2>Add a new snack topping:</h2>
            <label for="toppingName">Topping Name: </label>
            <input type="text" name="addSnackName" id="addSnackName">
            <div class="row row-cols-2">
            <div class="col col-details">Type: <input type="text" name="addSnackType" id="addSnackType"></div>
            <div class="col col-details">Shape: <input type="text" name="addSnackShape" id="addSnackShape"></div>
            <div class="col col-details">Flavor: <input type="text" name="addSnackFlavor" id="addSnackFlavor"></div>
            <div class="col col-details">Season: <input type="text" name="addSnackSeason" id="addSnackSeason"></div>
        <div class="row row-cols-1">
            <button type="button" class="btn btn-sm btn-outline-secondary btn-form" id="addSnackSubmit">Submit</button>
            <button type="button" class="btn btn-sm btn-outline-secondary btn-form" id="formCancel">Cancel</button>
        </form>
    </div>    
    `}