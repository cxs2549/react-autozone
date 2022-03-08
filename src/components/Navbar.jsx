import { useState, useRef } from "react"
import { CSSTransition } from "react-transition-group"
import styled from "styled-components"
import tw from "twin.macro"
import { BsBag } from "react-icons/bs"
import { BiSearch, BiHelpCircle } from "react-icons/bi"
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai"
import { GiCardboardBoxClosed } from "react-icons/gi"
import Hamburger from "hamburger-react"
import useOnClickOutside from "use-onclickoutside"

const StyledNavbar = styled.header`
  ${tw`h-16`};
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
    ${tw`font-semibold text-[16px]`}
  }
  li h3,
  p {
    color: var(--text-3);
  }
  span {
    color: var(--text-1);
  }
  svg {
    color: var(--text-1);
  }
  #burgerMenu {
    background-color: var(--surface-1);
    height: calc(100vh - 64px);
    padding-bottom: 1rem;
  }
  @media (prefers-color-scheme: dark) {
    img {
      filter: invert(1);
    }
    a:not(:first-child),
    #hamburger,
    #menuItem {
      &:hover {
        background-color: var(--surface-3);
      }
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
    opacity: 0.6;
    transition: opacity 200ms;
  }
  .overlay-exit {
    opacity: 0.6;
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
    className="mr-2 hover:bg-gray-200 rounded-full p-2 transition-colors duration-200"
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

  const handleOpen = () => {
    setOpen(!open)
    document.body.classList.add('no-flow')
  }
  const handleClose = () => {
    setOpen(false)
    document.body.classList.remove('no-flow')
  }

  useOnClickOutside(ref, handleClose)

  const MenuItem = ({ title, subtitles }) => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <div
          id="menuItem"
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between  h-12 px-5 z-10 cursor-pointer hover:bg-gray-200"
        >
          <h1 className="text-[24px] font-medium">{title}</h1>
          <AiOutlineRight className="w-5 h-5" />
        </div>
        <CSSTransition
          in={open}
          timeout={300}
          classNames="my-node"
          unmountOnExit
        >
          <div
            id="burgerMenu"
            className="fixed top-[64px] w-[75%] right-0 h-screen bg-white z-10"
          >
            <div
              id="menuItem"
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3  h-10 px-5 z-10 cursor-pointer hover:bg-gray-200"
            >
              <AiOutlineLeft className="w-4 h-4" />
              <h3>All</h3>
            </div>
            <div>
              <h1 className="p-5">{title}</h1>
            </div>
            <ul>
              <div>
                <div className="h-8 ">
                  {subtitles.map((subtitle, index) => (
                    <SubMenuItem
                      title={title}
                      subtitle={subtitle.subtitle}
                      links={subtitle.links}
                      soloLinks={subtitle.soloLinks}
                    />
                  ))}
                </div>
              </div>
            </ul>
          </div>
        </CSSTransition>
      </div>
    )
  }
  const SubMenuItem = ({ title, subtitle, links, soloLinks }) => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        {!soloLinks && (
          <div
            id="menuItem"
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between  h-8 px-5 z-10 cursor-pointer hover:bg-gray-200 opacity-70"
          >
            <h3>{subtitle}</h3>
            <AiOutlineRight className="w-4 h-4" />
          </div>
        )}
        {soloLinks && (
          <div>
            {soloLinks.map((link) => (
              <div
                id="menuItem"
                className="h-8 flex items-center px-5 z-10 cursor-pointer capitalize hover:bg-gray-200 opacity-70"
              >
                <h3>{link}</h3>
              </div>
            ))}
          </div>
        )}

        <CSSTransition
          in={open}
          timeout={300}
          classNames="my-node"
          unmountOnExit
        >
          <div
            id="burgerMenu"
            className="fixed top-[64px] w-[75%] right-0 h-screen bg-white z-10"
          >
            <div
              id="menuItem"
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3  h-10 px-5 z-10 cursor-pointer hover:bg-gray-200"
            >
              <AiOutlineLeft className="w-4 h-4" />
              <h3>{title}</h3>
            </div>
            <div>
              <h1 className="p-5">{subtitle && subtitle}</h1>
            </div>
            <ul>
              {links &&
                links.map((link, index) => (
                  <div
                    id="menuItem"
                    key={index}
                    className="cursor-pointer h-8 hover:bg-gray-200  flex items-center px-5 capitalize opacity-70"
                  >
                    <h3>{link}</h3>
                  </div>
                ))}
            </ul>
          </div>
        </CSSTransition>
      </div>
    )
  }
  const menuItems = [
    {
      title: "New Releases",
      subtitles: [
        {
          subtitle: "New For Men",
          links: ["shoes", "clothing", "equipment", "shop all new"],
        },
        {
          subtitle: "New For Women",
          links: ["shoes", "clothing", "equipment", "shop all new"],
        },
      ],
    },
    {
      title: "Men",
      subtitles: [
        {
          subtitle: "New & Featured",
          links: [
            "new releases",
            "best sellers",
            "best of Air Force",
            "vacation vibes",
            "style your air",
            "sale - up to 40% off",
          ],
        },
        {
          soloLinks: [
            "shoes",
            "tops & t-shirts",
            "shorts",
            "hoodies & sweatshirts",
            "pants & tights",
            "sale - up to 40% off",
          ],
        },
      ],
    },
    {
      title: "Women",
      subtitles: [
        {
          subtitle: "New & Featured",
          links: [
            "new releases",
            "best sellers",
            "best of Air Force",
            "vacation vibes",
            "style your air",
            "sale - up to 40% off",
          ],
        },
        {
          soloLinks: [
            "shoes",
            "tops & t-shirts",
            "shorts",
            "hoodies & sweatshirts",
            "pants & tights",
            "sale - up to 40% off",
          ],
        },
      ],
    },
    {
      title: "Kids",
      subtitles: [
        {
          subtitle: "New & Featured",
          links: [
            "new releases",
            "best sellers",
            "best of Air Force",
            "vacation vibes",
            "style your air",
            "sale - up to 40% off",
          ],
        },
        {
          soloLinks: [
            "shoes",
            "tops & t-shirts",
            "shorts",
            "hoodies & sweatshirts",
            "pants & tights",
            "sale - up to 40% off",
          ],
        },
      ],
    },
    {
      title: "Sale",
      subtitles: [
        {
          subtitle: "New & Featured",
          links: [
            "new releases",
            "best sellers",
            "best of Air Force",
            "vacation vibes",
            "style your air",
            "sale - up to 40% off",
          ],
        },
        {
          soloLinks: [
            "shoes",
            "tops & t-shirts",
            "shorts",
            "hoodies & sweatshirts",
            "pants & tights",
            "sale - up to 40% off",
          ],
        },
      ],
    },
  ]
  const BrandLink = ({ image, imageSize, brand }) => {
    return (
      <div
        id="menuItem"
        className="flex items-center gap-1 px-3 hover:bg-gray-200 h-12 cursor-pointer"
      >
        <div className="w-14 grid place-items-center">
          <img
            src={image}
            alt="brand"
            className={`${imageSize ? imageSize : "w-8"}`}
          />
        </div>
        <h3>{brand}</h3>
      </div>
    )
  }

  return (
    <div ref={ref}>
      {/* hamburger */}
      <div
        id="hamburger"
        className="translate-x-2  hover:bg-gray-200 rounded-full transition-colors duration-200"
      >
        <Hamburger toggle={handleOpen} toggled={open} size={22} />
      </div>
      <CSSTransition in={open} timeout={300} classNames="my-node" unmountOnExit>
        {/* Menu */}
        <div
          id="burgerMenu"
          className="fixed top-[64px] w-[75%] right-0 h-screen  z-10 overflow-y-scroll "
        >
          {/* Menu Items */}
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              title={item.title}
              subtitles={item.subtitles}
            />
          ))}
          {/* SNKRS Calendar Link */}
          <div
            id="menuItem"
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between  h-12 px-5 z-10 cursor-pointer mb-5 hover:bg-gray-200"
          >
            <h1 className="text-[24px] font-medium">SNKRS Calendar</h1>
          </div>
          {/* Brands */}
          <BrandLink image="/images/jordan.png" brand="Jordan" />
          <BrandLink
            image="/images/converse.png"
            imageSize="w-13"
            brand="Converse"
          />
          {/* Nike Member Signup */}
          <div className=" px-5 mt-8">
            <div className="flex flex-col">
              <p className="text-[20px] leading-[24px] font-medium text-[#757575] opacity-80">
                Become a Nike Member for the best products, inspiration and
                stories in sport.
              </p>
              <span className="text-[20px] leading-[24px] font-medium">
                Learn More
              </span>
            </div>
            <div className="flex gap-2 mt-8">
              <button className="rounded-full bg-black text-white px-5 h-10 font-medium">
                Join Us
              </button>
              <button className="rounded-full bg-white text-black border-2 border-gray-300 px-5 h-[38px] font-medium">
                Sign In
              </button>
            </div>
          </div>
          {/* Bottom Links */}
          <div className="mt-8">
            <div className="flex items-center">
              <div className="w-14 grid place-items-center">
                <GiCardboardBoxClosed size={30} />
              </div>
              <h3>Orders</h3>
            </div>
            <div className="flex items-center mt-4">
              <div className="w-14 grid place-items-center">
                <BiHelpCircle size={30} />
              </div>
              <h3>Help</h3>
            </div>
          </div>
        </div>
      </CSSTransition>
      {/* overlay */}
      <CSSTransition in={open} timeout={200} classNames="overlay" unmountOnExit>
        <div
          onClick={handleClose}
          className="fixed top-[64px] w-full opacity-60 right-0 h-screen bg-black"
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
