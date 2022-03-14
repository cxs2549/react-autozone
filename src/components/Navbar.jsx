import Hamburger from "hamburger-react"
import { useState } from "react"
import { CSSTransition } from "react-transition-group"
import styled from "styled-components"
import tw from "twin.macro"
import { AiOutlineShoppingCart } from "react-icons/ai"
import {BiSearch} from 'react-icons/bi'

const StyledNavbar = styled.header`
  ${tw`py-4 border-b`};
  background-color: var(--surface-1);
  #burger {
    #menu {
      background-color: var(--surface-2);
    }
    .my-node-enter {
      transform: translateY(-100%);
    }
    .my-node-enter-active {
      transform: translateY(0);
      transition: all 200ms;
    }
    .my-node-exit {
      transform: translateY(0);
    }
    .my-node-exit-active {
      transform: translateY(-100%);
      transition: all 200ms;
    }
  }
`
const Container = styled.div`
  ${tw`flex items-center justify-end px-4 h-full gap-6`}
`

const Logo = () => (
  <a href="/" className="absolute left-4">
    <img src="images/logo.svg" className=" w-[240px]" alt="logo" />
  </a>
)

const Cart = () => {
  return (
    <div className="">
      <AiOutlineShoppingCart size={24} />
    </div>
  )
}
const Burger = () => {
  const [isOpen, setIsOpen] = useState(false)
  const Menu = () => {
    return (
      <div id="menu" className="fixed top-[121px] left-0 w-full h-screen -z-10">
        {"I'll receive my-node-* classes"}
      </div>
    )
  }
  return (
    <div id="burger">
      <div className="-mr-[11px] ">
        <Hamburger size={24} toggle={setIsOpen} toggled={isOpen} />
      </div>
      <CSSTransition
        unmountOnExit
        in={isOpen}
        timeout={200}
        classNames="my-node"
      >
        <Menu />
      </CSSTransition>
    </div>
  )
}
const Searchbar = () => {
  return (
    <div className="flex items-center px-2 py-1 rounded gap-3 w-full bg-gray-300 mt-2">
      <div>
        <BiSearch size={24} color="#000" />
      </div>
      <input type="text" className="bg-transparent w-full placeholder-gray-600 focus:outline-none text-gray-700" placeholder="Find Parts and Products" />
    </div>
  )
}

const Navbar = () => {
  return (
    <StyledNavbar>
      <Container>
        <Logo />
        <Cart />
        <Burger />
      </Container>
      <Container>
        <Searchbar />
      </Container>
    </StyledNavbar>
  )
}
export default Navbar
