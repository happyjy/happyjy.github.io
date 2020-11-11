---
title: Structural_07.Proxy
date: 2020-10-11
author: jyoon
category: DesignPattern
tags:
  - Proxy
  - DesignPattern
  - Structural
  - JavaScript
---

# def
  * 프록시 패턴은 다른 객체에 대해 대신할 객체를 제공하고 다른 객체에 대한 액세스를 가능하게 한다.

  * 객체 지향 프로그래밍에서 객체는 인터페이스 (속성 및 메서드)를 통해 알리는 작업을 수행한다.
    - 이러한 객체의 클라이언트는이 작업이 빠르고 효율적으로 수행되기를 기대한다. 
    - 그러나 객체가 심각하게 제한되어 책임을 다할 수 없는 상황이 있다. 
    - [POINT]일반적으로 원격 리소스에 대한 종속성이 있거나 (네트워크 대기 시간이 발생) 객체를 로드하는데 오랜 시간이 걸리는 경우에 발생한다.

  * 이와 같은 상황에서는 프록시 패턴을 적용하고 원본 객체를 '대기'하는 프록시 객체(코드에서 geocache 객체)를 만든다. 
    - 프록시는 요청을 대상 객체로 전달한다. 
    - 프록시 객체의 인터페이스는 원래 객체와 동일하며 
      [POINT]클라이언트는 실제 객체가 아닌 프록시를 처리하고 있다는 사실조차 인식하지 못할 수 있다.

# Participants
  * Client 
    - 연산 요청을 위해서 프록시를 호출한다.
    - code: the run() function
  * Proxy 
    - 실제 객체와 비슷한 인터페이스를 제공한다.
    - 프록시가 실제 객체에 접근하기 위해서 reference를 유지한다.
    - code: GeoProxy
  * RealSubject 
    - 서비스가 요청되어지는 실제 객체
    - code: GeoCoder

# Sample Code 설명
  * GeoCoder 객체는 Google Maps Geocoding service를 가정한다. 
  * 코드에서 geocoding은 위치를 제공한다.(latitude/longitude (latlng)을 return 한다.
  * 예시 코드에는 4개 위치만 선언되어 있다. 하지만 수만개의 위치가 있을 수 있다.

  * GeoCoder는 상대적으로 느리기 때문에 Proxy object를 구현한다.
  * proxy 객체는 GeoProxy를 호출한다.
    - 이것은 알려진대로 같은 요청이 반복된다.
    - 그래서 자주 반복되는 위치 요청의 속도를 개선하기 위해서는 GeoProxy caches한다.
    - 만약 위치가 cache되어 있지 않은 상태라면 실제 GeoCoder 서비스를 호출하고 return을 cache 한다.

  * 여러 도시 위치가 조회되고 이들 중 다수는 동일한 도시에 대한 것이다.
  * GeoProxy는 이러한 호출을 지원하면서 캐시를 구축한다. 
    - 결국 GeoProxy는 geocoder.getLatLng으로 11개의 요청을 처리했지만 GeoCoder객체로 3번만 요청된다. 
    - 클라이언트 프로그램은 프록시 객체에 대해 모른다.(표준 getLatLng 메소드로 동일한 인터페이스를 호출)

# 나의 해석
  * 코드에서 POINT 주석으로 되어 있는 부분
    - getLatLng으로 요청 될때 geocache객체가 캐싱객체로 사용된다.
    - 그래서 캐싱 객체에 객체가 없을 때만 생성된 GeoCoder인스턴스(geocoder)의 getLatLng이 호출된다.
    
    - 예로 GeoCoder가 DB 로직이고 
      GeoProxy가 서버 코드라고 한다면
      GeoProxy에 요청이 왔을때 geocache에 있는 값이면 db요청을 하지 않아도 되기 때문에 비용을 줄일 수 있겠구나.

# CODE
```js
var log = (function () {
  var log = '';

  return {
    add: function (msg) { log += msg + '\n' },
    show: function () { console.log(log); log = ''; }
  }
})();

// RealSubject 역할
function GeoCoder() {
  this.getLatLng = function (address) {
    if (address === "Paris") {
      return "53.3700 N, 4.8340 E"
    } else if (address === "London") {
      return "52.3771 N, 4.8900 E"
    } else if (address === "Amsterdam") {
      return "51.3171 N, 0.1062 E"
    } else if (address === "Berlin") {
      return "52.5233 N, 13.4127 E"
    } else {
      return "";
    }
  }
}

// Proxy 역할
function GeoProxy() {
  var geocoder = new GeoCoder();
  // [POINT]
  var geocache = {};

  return {
    getLatLng: function (address) {
      if (!geocache[address]) {
        geocache[address] = geocoder.getLatLng(address);
      }
      log.add(address + ": " + geocache[address]);
      return geocache[address];
    },
    getCount: function () {
      var count = 0;
      for (var code in geocache) { count++; }
      return count;
    }
  }
}

function run() {
  var geo = new GeoProxy();

 //  geolocation requests
  geo.getLatLng("Paris");
  geo.getLatLng("London");
  geo.getLatLng("London");
  geo.getLatLng("London");
  geo.getLatLng("London");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("London");
  geo.getLatLng("London");

  log.add("\n Cache size: " + geo.getCount());
  log.show();
}

run();
```