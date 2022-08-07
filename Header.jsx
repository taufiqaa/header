import React from "react"
import triangle from "../../assets/triangle.svg"
import profile from "../../assets/user.svg"
import product from "../../assets/drink.svg"
import toping from "../../assets/toping.svg"
import out from "../../assets/logout.svg"
import { useNavigate } from "react-router-dom"
import logo from "../../assets/logo.svg"
import cart from "../../assets/cart.svg"
import { UserContext } from "../../context/user" 



const photo = "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"

export default function Header({addCart}) {
  const navigate = useNavigate()
  
  const [modalLogin, setModalLogin] = React.useState(false)
  const [modalRegister, setModalRegister] = React.useState(false)

  function switchModal() {
    if (modalLogin) {
      setModalLogin(false)
      setModalRegister(true)
    } else {
      setModalRegister(false)
      setModalLogin(true)
    }
  }

  const [user, setUser] = React.useContext(UserContext)

  function handleOnSubmit(e) {
    e.preventDefault()

    const email = document.getElementById("email").value
    let status

    if (email === "admin@gmail.com") {
      status = "admin"
      navigate('/income')
    } else {
      status = "customer"
    }
    
    const data = { email, status }

    setUser({
      type: 'LOG_IN',
      payload: data
    })

    setModalLogin(false)
    setModalRegister(false)
  }

  function logOut() {
    setUserDropdown(false)
    setAdminDropdown(false)
    setUser({ type: 'LOG_OUT' })
  }
  
  const [userDropdown, setUserDropdown] = React.useState(false)
  const [adminDropdown, setAdminDropdown] = React.useState(false)
  
  return (
    <header className="fixed z-index-2 w100">
      <nav className="py2 px6 flex jc-between ai-center bg-white">
        <img className="logo round cursor-pointer"
         src={logo} alt="logo"
         onClick={ () => navigate("/") }
        />

        { user.isLogin ?
        <div className="loged">
         <img className="cursor-pointer" src={cart} alt="cart" />
         <span>{addCart}</span>
          <img className="cursor-pointer" src={photo} alt="user"
           onClick={
            () => (user.user.status === "admin") ? setAdminDropdown(!adminDropdown) : setUserDropdown(!userDropdown)
           }
          />
        </div>
        :
        <div className="grid col-2 col-gap-1 w15rem">
          <button className="py0-1 bg-none br5 br-red txt-red bold"
           onClick={ () => setModalLogin(true) }
          >Login</button>

          <button className="py0-1 bg-red br5 br-red txt-white fw500"
           onClick={ () => setModalRegister(true) }
          >Register</button>
        </div>
        }
      </nav>

      {modalLogin &&
      <section className="modal fixed z-index-3 w100 h100 flex jc-center ai-center"
      onClick={ () => setModalLogin(false) }
      >
        <form className="py2 px1-5 flex-col bg-white br10"
         onClick={ (e) => e.stopPropagation() }
         onSubmit={ handleOnSubmit }
        >
          <h2 className="mb1-75 txt-red fw700">Login</h2>
          <input className="modal-input br-red br5 mb1 fs0-9"
           type="email"
           id="email" name="email"
           placeholder="Email"
           required
          />
          <input className="modal-input br-red br5 mb2 fs0-9"
           type="password"
           id="password" name="password"
           placeholder="Password"
           required
          />
          <button className="pt0-3 pb0-5 mb1 bg-red br-none br5 fs0-9 fw500 txt-white"
           type="submit"
          >Login</button>
          <p className="fs0-9 fw500 ta-center">Don't have an account ? Click <strong className="cursor-pointer"
           onClick={ switchModal }
           >Here</strong>
          </p>
        </form>
      </section>
      }
      {modalRegister &&
      <section className="modal fixed z-index-3 w100 h100 flex jc-center ai-center"
      onClick={ () => setModalRegister(false) }
      >
        <form className="py2 px1-5 flex-col bg-white br10"
         onClick={ (e) => e.stopPropagation() }
         onSubmit={ handleOnSubmit }
        >
          <h2 className="mb1-75 txt-red fw700">Register</h2>
          <input className="modal-input br-red br5 mb1 fs0-9"
           type="email"
           id="email" name="email"
           placeholder="Email"
          />
          <input className="modal-input br-red br5 mb1 fs0-9"
           type="password"
           id="password" name="password"
           placeholder="Password"
          />
          <input className="modal-input br-red br5 mb2 fs0-9"
           type="text"
           id="name" name="name"
           placeholder="Full Name"
          />
          <button className="pt0-3 pb0-5 mb1 bg-red br-none br5 fs0-9 fw500 txt-white"
           type="submit"
          >Register</button>
          <p className="fs0-9 fw500 ta-center">Already have an account ? Click <strong className="cursor-pointer"
           onClick={ switchModal }
           >Here</strong>
          </p>
        </form>
      </section>
      }
      {userDropdown &&
      <section className="flex">
          <ul className="dropdown bg-white br10 fw700 cursor-pointer">
              <img className="dropdown-triangle" src={triangle} alt="white-triangle" />
              <li className="py1 pr3 pl1-5 flex ai-center"
               onClick={ () => navigate('/profile') }
              >
                <img src={profile} alt="icon" />
                <p>Profile</p>
              </li>
              <li className="py1 pr3 pl1-5 flex ai-center"
               onClick={ logOut }
              >
                <img src={out} alt="icon" />
                <p>Logout</p>
              </li>
          </ul>
      </section>
      }
      {adminDropdown &&
      <section className="flex">
          <ul className="dropdown bg-white br10 fw700 cursor-pointer">
              <img className="dropdown-triangle" src={triangle} alt="white-triangle" />
              <li className="py1 pr3 pl1-5 flex ai-center"
               onClick={ () => navigate('/add-product') }
              >
                <img src={product} alt="icon" />
                <p>Add Product</p>
              </li>
              <li className="pt0-5 pb1 pr3 pl1-5 flex ai-center"
               onClick={ () => navigate('/add-toping') }
              >
                <img src={toping} alt="icon" />
                <p>Add Toping</p>
              </li>
              <li className="py1 pr3 pl1-5 flex ai-center"
               onClick={ logOut }
              >
                <img src={out} alt="icon" />
                <p>Logout</p>
              </li>
          </ul>
      </section>
      }
    </header>
  )
}
