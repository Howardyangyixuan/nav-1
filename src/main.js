const $siteList = $(".siteList");
//   const $last = $(".last");
const $last = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
let hashMap = xObject || [
  {
    logo: "A",
    logoType: "Text",
    url: "https://developer.mozilla.org",
  },
  {
    logo: "W",
    logoType: "image",
    url: "https://www.w3.org",
  },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};
//a标签跳转<a href="${node.url}"></a>，改为js实现跳转
const renderEach = (node, index) => {
  //   console.log(index);
  const $li = $(`<li>
    <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close"> 
         <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-close"></use>
         </svg>
        </div>
    </div>
    </li>`);
  $li.insertBefore($last);
  $li.on("click", () => {
    //新开窗口
    // window.open(node.url);
    window.location.href = node.url;
  });

  $li.on("click", ".close", (e) => {
    e.stopPropagation();
    hashMap.splice(index, 1);
    render();
    // console.log(index);
  });
};
const render = () => {
  $siteList.find("li:not(.last").remove();
  hashMap.forEach(renderEach);
};
render();
$(".addButton").on("click", () => {
  let url = window.prompt("请输入要添加的网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  const simpleUrl = simplifyUrl(url);
  hashMap.push({
    logo: simpleUrl[0].toUpperCase(),
    logoType: "Text",
    url: url,
  });
  console.log(url);
  render();
  //   console.log($siteList);
  //   const $site = $(`<li>
  //     <a href="${url}">
  //     <div class="site">
  //       <div class="logo">${simpleUrl[0].toUpperCase()}</div>
  //       <div class="link">${simpleUrl}</div>
  //     </div>
  //   </a>
  //   </li>`).insertBefore($last);
});
window.onbeforeunload = () => {
  //   console.log("关闭");
  const string = JSON.stringify(hashMap);
  //   console.log(typeof hashMap);
  //   console.log(hashMap);
  //   console.log(typeof string);
  //   console.log(string);
  window.localStorage.setItem("x", string);
};

$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.location.href = hashMap[i].url;
      break;
    }
  }
});
