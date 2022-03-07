import { useState, useRef } from "react"
import styled from "styled-components"
import tw from "twin.macro"
import { BsBag } from "react-icons/bs"
import { BiSearch } from "react-icons/bi"
import Hamburger from "hamburger-react"
import { CSSTransition } from "react-transition-group"
import useOnClickOutside from "use-onclickoutside"

const StyledNavbar = styled.header`
  ${tw`h-16`}
  a:not(:first-child) {
    height: 48px;
    width: 48px;
    display: grid;
    place-items: center;
  }
  @media (prefers-color-scheme: dark) {
    img {
      filter: invert(1);
    }
  }

  .my-node-enter {
    opacity: 0;
    right: -100%;
  }
  .my-node-enter-active {
    opacity: 1;
    right: 0;
    transition: all 300ms;
  }
  .my-node-exit {
    opacity: 1;
    right: 0;
  }
  .my-node-exit-active {
    opacity: 0;
    right: -100%;
    transition: all 300ms;
  }

  .overlay-enter {
    opacity: 0;
  }
  .overlay-enter-active {
    opacity: .4;
    transition: opacity 200ms;
  }
  .overlay-exit {
    opacity: .4;
  }
  .overlay-exit-active {
    opacity: 0;
    transition: opacity 200ms;
  }
`
const Container = styled.div`
  ${tw`flex items-center justify-end px-5 h-full relative`}
`

const Logo = () => (
    <a href="nike.com" className="w-16 absolute left-5">
      <img
        className="w-16 hover:scale-125 transition-transform duration-150"
        src="/images/logo.png"
        alt=""
      />
    </a>
)
const Bag = () => (
  <a
    href="/cart"
    className="mr-2  hover:bg-gray-200 rounded-full p-2 transition-colors duration-200"
  >
    <BsBag className="w-7 h-7" />
  </a>
)
const Search = () => (
  <a
    href="/cart"
    className=" translate-y-[.75px] hover:bg-gray-200 rounded-full p-2 transition-colors duration-200"
  >
    <BiSearch className="w-7 h-7" />
  </a>
)
const Burger = () => {
  const [open, setOpen] = useState(false)
  const ref = useRef()
  useOnClickOutside(ref, () => setOpen(false))
  return (
    <div ref={ref}>
      <div className="translate-x-2  hover:bg-gray-200 rounded-full transition-colors duration-200">
        <Hamburger toggle={setOpen} toggled={open} size={22} />
      </div>
      <CSSTransition in={open} timeout={300} classNames="my-node" unmountOnExit>
        <div className="fixed top-[64px] w-[65%] right-0 h-screen bg-gray-300 z-10">
          
        </div>
      </CSSTransition>
      <CSSTransition in={open} timeout={200} classNames="overlay" unmountOnExit>
        <div onClick={() => setOpen(false)} className="fixed top-[64px] w-full opacity-40 right-0 h-screen bg-black"></div>
      </CSSTransition>
    </div>
  )
}

const Navbar = () => {
  return (
    <StyledNavbar>
      <Container>
        <Logo />
        <Bag />
        <Search />
        <Burger />
      </Container>
    </StyledNavbar>
  )
}
export default Navbar
