// 셀렉트박스 관련 스크립트
let citys= {
    a: {
        details: ["강남", "신촌", "잠실"],
        name: "서울특별시"
    },
    b : {
        details: ["수원", "광명", "용인"],
        name: "경기도"
    },
    c : {
        details: ["춘천", "강릉", "속초"],
        name: "강원도"
    },
    d : {
        details: ["천안","태안","공주"],
        name: "충청남도"
    },
    e : {
        details: ["충주","단양","청주"],
        name: "충청북도"
    },
    f : {
        details: ["통영","남해","거제"],
        name: "경상남도"
    },
    g : {
        details: ["경주","포항","안동"],
        name: "경상북도"
    },
    h : {
        details: ["여수","전주","목포"],
        name: "전라남도"
    },
    i : {
        details: ["전주","익산","익산"],
        name: "전라북도"
    },
    j : {
        details: ["서귀포","제주","우도"],
        name: "제주특별자치도"
    },
}
const getCityMap = (key) => citys[key] || []

function categoryChange(e) {
    let target = document.getElementById("detail_city");
    let citys = getCityMap(e.value).details

    target.options.length = 0;
    for (city of citys) {
        optionTemplete(target,  city)
    }	
}

function optionTemplete (target, city) {
    var opt = document.createElement("option");
    opt.value =city;
    opt.innerHTML = city;
    target.appendChild(opt);
}





// 카카오지도
var container = document.getElementById('map');
var options = {
    // 경복궁 위경도 설정
    center: new kakao.maps.LatLng(37.577018, 126.976849),
    level: 3
};

var map = new kakao.maps.Map(container, options);

kakao.maps.event.addListener(map, 'click', function(mouseEvent) {     
    //console.log(mouseEvent); return false;   
    var latlng = mouseEvent.latLng;

    document.querySelector('input[name="lat"]').value = latlng.getLat();
    document.querySelector('input[name="lng"]').value = latlng.getLng();
});


