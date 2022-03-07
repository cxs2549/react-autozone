import { useState, useRef } from "react"
import styled from "styled-components"
import tw from "twin.macro"
import { BsBag } from "react-icons/bs"
import { BiSearch } from "react-icons/bi"
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai"
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
  h1 {
    ${tw`text-[24px] font-medium`}
  }
  h3 {
    ${tw`font-medium text-[16px]`}
  }
  li h3 {
    color: var(--text-3);
  }
  #burgerMenu {
    background-color: var(--surface-1);
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
    opacity: 0.4;
    transition: opacity 200ms;
  }
  .overlay-exit {
    opacity: 0.4;
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

  const MainItem = ({ title, subtitle, list }) => {
    const [open, setOpen] = useState(false)
    const [openSub, setOpenSub] = useState(false)
    return (
      <div>
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between  h-16 px-5 z-10 cursor-pointer"
        >
          <h1 className="text-[24px] font-medium">{title}</h1>
          <AiOutlineRight className="w-6 h-6" />
        </div>
        <CSSTransition
          in={open}
          timeout={300}
          classNames="my-node"
          unmountOnExit
        >
          <div id="burgerMenu" className="fixed top-[64px] w-[75%] right-0 h-screen bg-white z-10">
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3  h-16 px-5 z-10 cursor-pointer"
            >
              <AiOutlineLeft className="w-6 h-6" />
              <h3>All</h3>
            </div>
            <div>
              <h1 className="p-5">{title}</h1>
            </div>
            <ul>
              <li className="  h-10 px-5">
                <div
                  onClick={() => setOpenSub(!openSub)}
                  className="flex items-center justify-between h-full cursor-pointer"
                >
                  <h3>{subtitle}</h3>
                  <AiOutlineRight className="w-6 h-6" />
                </div>
                <CSSTransition
                  in={openSub}
                  timeout={300}
                  classNames="my-node"
                  unmountOnExit
                >
                  <div id="burgerMenu" className="fixed top-[64px] w-[75%] right-0 h-screen bg-white z-10">
                    <div
                      onClick={() => setOpenSub(!openSub)}
                      className="flex items-center gap-3  h-16 px-4 z-10 cursor-pointer"
                    >
                      <AiOutlineLeft className="w-6 h-6" />
                      <h3>{title}</h3>
                    </div>
                    <div>
                      <h1 className="p-5">{subtitle}</h1>
                    </div>
                    <ul>
                      {list.map((item, index) => (
                        <li
                          key={index}
                          className=" px-5 capitalize h-10 flex items-center cursor-pointer"
                        >
                          <h3>{item}</h3>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CSSTransition>
              </li>
            </ul>
          </div>
        </CSSTransition>
      </div>
    )
  }

  const mens = ["shoes", "clothing", "equipment", "shop all new"]

  return (
    <div ref={ref}>
      <div className="translate-x-2  hover:bg-gray-200 rounded-full transition-colors duration-200">
        <Hamburger toggle={setOpen} toggled={open} size={22} />
      </div>
      {/* menu */}
      <CSSTransition in={open} timeout={300} classNames="my-node" unmountOnExit>
        <div id="burgerMenu" className="fixed top-[64px] w-[75%] right-0 h-screen  z-10">
          <MainItem title="New Releases" subtitle="New For Men" list={mens} />
        </div>
      </CSSTransition>
      {/* overlay */}
      <CSSTransition in={open} timeout={200} classNames="overlay" unmountOnExit>
        <div
          onClick={() => setOpen(false)}
          className="fixed top-[64px] w-full opacity-40 right-0 h-screen bg-black"
        ></div>
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
