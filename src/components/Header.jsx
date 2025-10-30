import React from 'react'

function Header() {
  return (
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <img src='../icon.png' style={{width:'85px'}}></img>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="" id="navbarText">
        
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="#" style={{fontSize:'30px'}}><i class="bi bi-headset"> </i></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" style={{fontSize:'30px'}}><i class="bi bi-bell">  </i></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" style={{fontSize:'30px'}}><i class="bi bi-person"></i></a>
        </li>
      </ul>
      
      {/* <span class="navbar-text">
        Navbar text e element ...
      </span> */}
      {/* <span class="navbar-text">
        Navbar text with an inline element
      </span> */}
    </div>

  </div>
</nav>

  )
}

export default Header
