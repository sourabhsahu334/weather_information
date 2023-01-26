import React from 'react'

const City = ({item}) => {
  return (
   <div style={{display:"flex",height:"50px",width:"550px",background: "linear-gradient(#e66465, #9198e5)",marginTop:"10px"}}><strong>city:</strong>{item.name}___
    <strong>
        Temperature:</strong>{item.main.temp}__<span><strong>
            Whether:</strong></span>{item.weather[0].description}
            <img  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}/>
    </div>
   
    
  )
}

export default City