import React from 'react'
import "./.././views/footer.css"
const Footer = () => {
  return (
    <>
         <footer>
        Powered By <span id="kalpesh"> -  My Demo Shop Pvt Ltd My Demo Shop © 2022 .</span>
        <br />
        <span>
            <i
                className="fab fa-github"
                onClick={() =>
                    window.open("https://github.com/Kalpeshwani222", "_blank")
                }
            ></i>
        
            <i
                className="fab fa-linkedin"
                onClick={() =>
                    window.open(
                        "https://www.linkedin.com/in/wanikalpesh/",
                        "_blank"
                    )
                }
            ></i>
            <i
                className="fab fa-youtube"
                onClick={() =>
                    window.open(
                        "https://www.youtube.com/channel/UCNhcwdT-CRazfiAW7iVVDTw",
                        "_blank"
                    )
                }
            ></i>
            <i
                className="fas fa-envelope"
                onClick={() =>
                    window.open("mailto:wanikalpeshanil@gmail.com", "_blank")
                }
            ></i>

           
            
        </span>
    </footer>
    </>
  )
}

export default Footer