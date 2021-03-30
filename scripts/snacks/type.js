export const addType = () => {
    return `
    <div class="typeContainer"
        <form class="typeForm">
            <h2>Add a new type of snacks:</h2>
            <label for="typeName">Type Name: </label>
            <input type="text" name="typeName" id="typeName">
            <button type="button" class="btn btn-sm btn-outline-secondary btn-form" id="typeSubmit">Submit</button>
            <button type="button" class="btn btn-sm btn-outline-secondary btn-form" id="formCancel">Cancel</button>
        </form>
    </div>    
    `
}