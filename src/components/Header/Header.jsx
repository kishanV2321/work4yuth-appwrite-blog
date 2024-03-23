import React from 'react'
import { Container, LogoutBtn, Logo } from '../index'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]
  return (
    <>
      <header className='py-3 shadow bg-[#040404]'>
        <Container>
          <nav className='flex justify-center items-center'>
            <div className='mr-4'>
              <Link to="https://www.instagram.com//work4yuth"
                target='_blank'>
                <Logo />
              </Link>
            </div>
            <ul className='flex ml-auto'>
              {navItems.map((item) => item.active ? (
                <li className="hidden md:block" key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `flex items-center px-6 py-2 duration-200 
                    ${isActive ? "text-white underline underline-offset-2" : "text-white"} hover:bg-[#04a0f7] rounded-full`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null)}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </nav>
        </Container>
      </header>
      <nav class="md:hidden bg-sky-900">
        <div class="max-w-screen-xl px-4 py-3 mx-auto">
          <div class="flex items-center">
            <ul class="flex flex-row mt-0 space-x-1 sm:space-x-4 rtl:space-x-reverse text-sm sm:text-base">
            {navItems.map((item) => item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `flex items-center px-6 py-2 duration-200 
                    ${isActive ? "text-white underline underline-offset-2" : "text-white"} hover:text-[#04a0f7] rounded-full`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null)}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header