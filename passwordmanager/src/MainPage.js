/**
 * 
 */
import Select from "react-select"

const MainPage = () => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
    
    const selectPrefs = {
        isClearable: true,
        isSearchable: true
    }

    return ( 
        <div className="main-page">
            <div className="select">
                <Select 
                    options={options} 
                    isClearable={selectPrefs.isClearable}
                    isSearchable={selectPrefs.isSearchable}
                />
            </div>
            <div className="login-info">
                <form>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </form>
            </div>
        </div>
     );
}
 
export default MainPage;