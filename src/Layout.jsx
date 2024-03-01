import React from 'react'
import { Outlet } from 'react-router'

export default function Layout() {
    return (
        <div className="pageContent">
          <header>
              <a href="/">
                  <img src="/images/rubik.png" alt="logo"/>
              </a>
              <h1>Goofy games</h1>
              <img src="/images/programmer.png" alt="user" className="userLogo" />
          </header>
          <div className="left-sidebar">
              Left Sidebar
          </div>
          <main>
              <Outlet />
          </main>
          <div className="right-sidebar">
              Right Sidebar
          </div>
          <footer>Goofy games — MerlinovaBoroda 2024</footer>
        </div>
      )
}
