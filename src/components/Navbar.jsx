import styled from "styled-components"
import tw from "twin.macro"
import { BsBag } from "react-icons/bs"
import { BiSearch } from "react-icons/bi"
import Hamburger from "hamburger-react"

const StyledNavbar = styled.header`
  ${tw`h-16`}
  @media (prefers-color-scheme: dark) {
    img {
      filter: invert(1);
    }
  }
`

const Container = styled.div`
  ${tw`flex items-center justify-between px-5 h-full`}
`

const Logo = () => (
  <a href="/" className="flex-1">
    <img className="w-16" src="/images/logo.png" alt="" />
  </a>
)
const Bag = () => (
  <a href="/cart" className="mr-7">
    <BsBag className="w-7 h-7" />
  </a>
)
const Search = () => (
  <a href="/cart" className="mr-1 translate-y-[.75px]">
    <BiSearch className="w-7 h-7" />
  </a>
)
const Burger = () => {
  return (
    <div>
      <div className="translate-x-2">
        <Hamburger size={22} />
      </div>
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
