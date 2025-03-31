import React, { useState } from 'react'
import { API_URL } from '../utilities/ApiPath.js'
import { ThreeCircles } from 'react-loader-spinner';


function AddForm() {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); 


  const handleImageUpload = (event)=>{
    const selectedImage = event.target.files[0];
    setFile(selectedImage)
    localStorage.setItem("img", selectedImage.name)
    console.log("IMG --- >",selectedImage)
}

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item != value));
    }else {
      setCategory([...category, value])
    }
  }

  const handleRegionChange = (e) => {
    const value = e.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item != value));
    }else {
      setRegion([...region, value])
    }
  }

  const handleFirmSubmit = async(e) => {
    e.preventDefault()
    setLoading(true); 
    try {
      const loginToken = localStorage.getItem("loginToken");
      if (!loginToken) {
        console.error("User not authenticated, beacuse loginToken is not there...")
      }
// checkboxes 

      const formData = new FormData();

      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("offer", offer);
      formData.append("image", file);

      category.forEach((value) => {
        formData.append('category', value)
      })

      region.forEach((value) => {
        formData.append('region', value)
      }) 

      
      const response = await fetch(`${API_URL}/firm/add-firm`, 
              {
                  method: 'POST',
                  headers: {
                      'token': `${loginToken}`
                  },
                  body: formData
              })
              const data  = await response.json();

            if(response.ok){
              console.log("firm Data: ", data);
              setFirmName("")
              setArea("")
              setCategory([])
              setRegion([])
              setOffer("")
              setFile(null)
              alert("Firm added succesfully... ")
            } else if (data.message === "vendor can have only one firm...") {
              alert("Firm Exists 🥗. Only 1 firm can be added  ")
            } else {
              alert('Failed to add Firm')
            }

              
            const vendorFirmId = data.firmId;
            const vendorRestuarant= data.vendorFirmName;
            const firmImage = data.firmImage;
          
            localStorage.setItem('firmId', vendorFirmId);
            localStorage.setItem('firmName', vendorRestuarant);
            localStorage.setItem('firmImage', firmImage )

            window.location.reload()

      } catch (error) {
        console.error("failed to add Firm")
        alert("failed to add Firm")
      }finally {
        setLoading(false)
      }
    }
    
  return (
    <div className="firmSection">
      {loading &&        <div className="loaderSection">
        <ThreeCircles
          visible={loading}
          height={100}
          width={100}
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>}
      

      {!loading &&  <form className="tabelFrom" onSubmit={handleFirmSubmit}>
        <h3>Add Firm</h3>
          <label className='label'>Firm Name: </label>
          <input 
                type="text" 
                name='firmName'
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
                /> <br />

        <label className='label'>Area: </label>
        <input 
                type="text" 
                name='area'
                value={area}
                onChange={(e) => setArea(e.target.value)}
                />  <br />
        
        <div className="checkinp">
          <label className='catlab'>Category:</label>
          <div className="inputContainer">
              <div className="checkboxContainer">
                <label >Veg</label>
                <input 
                      type="checkbox" 
                      value="veg"
                      checked = {category.includes('veg')}
                      onChange={handleCategoryChange}
                      />
              </div>
              <div className="checkboxContainer">
                <label >Non-Veg</label>
                <input 
                      type="checkbox" 
                      value='non-veg'
                      checked = {category.includes('non-veg')}
                      onChange={handleCategoryChange}
                      />
              </div>
          </div>
        </div>  <br />

        <div className="checkinp">
          <label className='catlab'>Region:</label>
          <div className="inputContainer">
            <div className="reg">
                <label >South-Indian</label>
                <input 
                      type="checkbox" 
                      value='south-indian'
                      checked = {region.includes('south-indian')}
                      onChange={handleRegionChange}
                      />
              </div>
              <div className="reg">
                <label >North-Indian</label>
                <input 
                      type="checkbox" 
                      value='north-indian'
                      checked = {region.includes('north-indian')}
                      onChange={handleRegionChange}
                      />
              </div>
              <div className="reg">
                <label >Chinese</label>
                <input 
                    type="checkbox" 
                    value='chinese'
                    checked = {region.includes('chinese')}
                    onChange={handleRegionChange}
                    />
              </div>
            <div className="reg">
              <label >Bakery</label>
              <input 
                    type="checkbox" 
                    value='bakery'
                    checked = {region.includes('bakery')}
                    onChange={handleRegionChange}
                    />
            </div>
          </div>
        </div>  <br />

        <label className='label'>Offer: </label>
        <input 
              type="text" 
              name='offer'
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
        /> <br />

        <label className='label'>FirmImage: </label>
        <input 
              type="file"
              onChange={handleImageUpload} 
              />

      <div className="btnSubmit">
            <button type='submit'>Submit</button>
        </div>
      </form> }

    </div>
  )
}

export default AddForm