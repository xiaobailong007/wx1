function converToCastSrting(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin = casts[idx].name + "/";
  }
  return castsjoin.substring(0, castsjoin.length - 2)
}

export{
  converToCastSrting
}