class MyComponent extends HTMLElement {
  connectedCallback() {
    const template = document.createElement('template');
    template.innerHTML = `
        <style>
          :host .personalmenu-popup button {
            width:100%;
            font-size: 16px;
            border-radius: 4px;
          }

          :host .personalmenu-popup{
            font-size: 16px;
          }
        
        </style>
        <div class="personalmenu-popup">
          <h2 class="title">개인메뉴</h2>
          <button onclick="location.href='updatemember.html'">회원정보수정</button>
          <button onclick="deleteMember()">회원탈퇴</button>
          <button onclick="logoutMember()">로그아웃</button>
        </div>

      
    `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('my-component', MyComponent);




class CreateChannel extends HTMLElement {
  connectedCallback() {
    const template = document.createElement('template');
    template.innerHTML = `
        <style>
          :host .personalmenu-popup button {
            width:100%;
            font-size: 16px;
            border-radius: 4px;
            border: none;
          }

          :host .personalmenu-popup{
            font-size: 16px;
          }
        
        </style>
        <div class="createchannel-popup">
          <h2 class="title">개인메뉴</h2>
          <button onclick="location.href='updatemember.html'">회원정보수정</button>
          <button onclick="deleteMember()">회원탈퇴</button>
          <button onclick="logoutMember()">로그아웃</button>
        </div>

      
    `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('create-channel', CreateChannel);