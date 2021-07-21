import PropTypes from "prop-types"
import React, { useState } from "react"

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap"

const Header = props => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <div>
      <Navbar color="light" light expand="md">
        <div className="container">
          <NavbarBrand href="/">jYoonBlog</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {/* <NavItem>
                <NavLink href="/team/">Team</NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink href="/category/">category</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/tags/">tags</NavLink>
              </NavItem>
              {/* <NavItem>
								<NavLink href='/about/'>about</NavLink>
							</NavItem> */}
              <NavItem>
                <NavLink href="https://github.com/happyjy">GitHub</NavLink>
              </NavItem>
            </Nav>
            {/* <NavbarText>Simple Text</NavbarText> */}
          </Collapse>
        </div>
      </Navbar>
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
