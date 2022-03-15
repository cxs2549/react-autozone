import Hamburger from "hamburger-react"
import { useState, useRef } from "react"
import { CSSTransition } from "react-transition-group"
import styled from "styled-components"
import tw from "twin.macro"
import {
  AiOutlineShoppingCart,
  AiFillCar,
  AiOutlineRight,
  AiOutlineUser,
} from "react-icons/ai"
import { BiSearch } from "react-icons/bi"
import { MdLocationOn } from "react-icons/md"
import useOnClickOutside from "use-onclickoutside"

const StyledNavbar = styled.header`
  ${tw`border-b z-10`};
  background-color: var(--surface-1);
  #logo {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 1rem;
  }
  #burger {
    #menu {
      background-color: var(--surface-2);
    }
    .my-node-enter {
      transform: translateY(-10%);
      opacity: 0;
      z-index: -10;
    }
    .my-node-enter-active {
      transform: translateY(0);
      opacity: 1;
      transition: all 400ms;
      z-index: -10;
    }
    .my-node-enter-done {
      z-index: 10;
    }
    .my-node-exit {
      transform: translateY(0);
      opacity: 1;
      z-index: -10;
    }
    .my-node-exit-active {
      transform: translateY(-10%);
      transition: all 400ms;
      opacity: 0;
      z-index: -10;
    }
  }
`
const Container = styled.div`
  ${tw`flex items-center justify-end h-full gap-1 md:gap-3 z-10 max-w-[1270px] mx-auto relative`};
  background-color: var(--surface-1);
`

const Logo = () => (
  <a href="/" id="logo" className="pt-3">
    <img src="images/logo.svg" className="transition-all duration-200 w-[240px] md:w-[270px] xl:w-[300px]" alt="logo" />
  </a>
)

const User = () => {
  return (
    <div className="hidden  w-[48px] md:flex justify-center">
      <AiOutlineUser size={24} />
    </div>
  )
}

const Cart = () => {
  return (
    <div className=" w-[48px] flex justify-center">
      <AiOutlineShoppingCart size={24} />
    </div>
  )
}
const Burger = () => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef()
  useOnClickOutside(ref, () => setIsOpen(false))
  const Menu = () => {
    return (
      <div id="menu" className="fixed top-[154px] md:top-[117px] left-0 w-full h-screen">
        {"I'll receive my-node-* classes"}
      </div>
    )
  }
  return (
    <div ref={ref} id="burger">
      <div className="mr-1 ">
        <Hamburger rounded size={24} toggle={setIsOpen} toggled={isOpen} />
      </div>
      <CSSTransition
        unmountOnExit
        in={isOpen}
        timeout={400}
        classNames="my-node"
      >
        <Menu />
      </CSSTransition>
    </div>
  )
}
const Searchbar = () => {
  return (
    <div className="flex items-center px-2 py-1 mb-3 mt-1 rounded-md gap-3 w-full bg-gray-200 mx-4 md:hidden">
      <div>
        <BiSearch size={22} color="#000" />
      </div>
      <input
        type="text"
        className="bg-transparent w-full placeholder-gray-600 focus:outline-none text-gray-700 cursor-text"
        placeholder="Find Parts and Products"
      />
    </div>
  )
}
const AddLocation = () => (
  <div className="flex w-full justify-between md:items-center border-t md:border-none md:pb-2">
    <div id="add" className="flex-1 flex gap-2 items-center border-r md:border-none h-14  px-4 ">
      <AiFillCar size={24} />
      <div className="flex items-center gap-1">
        <p className="text-sm font-medium">Add Vehicle</p>
        <AiOutlineRight size={18} className="mt-0.5" />
      </div>
    </div>
    <div className="hidden md:flex items-center p-2 rounded-md gap-3  bg-gray-200 w-[45%]">
      <div>
        <BiSearch size={22} color="#000" />
      </div>
      <input
        type="text"
        className="bg-transparent w-full placeholder-gray-600 focus:outline-none text-gray-700 cursor-text"
        placeholder="Find Parts and Products"
      />
    </div>
    <div id="location" className="flex-1 flex gap-1 items-center justify-center md:justify-end h-14 md:pr-4">
      <MdLocationOn size={24} />
      <div>
        <p className="text-[11px] font-medium">162 S Vermont Ave</p>
        <p className="text-[11px] text-green-700 font-medium -mt-0.5">
          OPEN Until 9:00 PM
        </p>
      </div>
      <AiOutlineRight size={18} className="mt-0.5" />
    </div>
  </div>
)

const Navbar = () => {
  return (
    <StyledNavbar>
      <Container>
        <Logo />
        <User />
        <Cart />
        <Burger />
      </Container>
      <Container>
        <Searchbar />
      </Container>
      <Container>
        <AddLocation />
      </Container>
    </StyledNavbar>
  )
}
export default Navbar
