import math,os,subprocess,json,sys
from PIL import Image
d=sys.argv[1];Z=6;N=256*2**Z
def px(lon,lat):return (lon+180)/360*N,(1-math.log(math.tan(math.pi/4+math.radians(lat)/2))/math.pi)/2*N
lon0,lon1,lat0,lat1=32.0,60.0,12.0,33.2
x0,y0=px(lon0,lat1);x1,y1=px(lon1,lat0)
tx0,tx1,ty0,ty1=int(x0//256),int(x1//256),int(y0//256),int(y1//256)
big=Image.new('RGB',((tx1-tx0+1)*256,(ty1-ty0+1)*256))
for tx in range(tx0,tx1+1):
  for ty in range(ty0,ty1+1):
    f=f'{d}/{tx}_{ty}.jpeg'
    if not os.path.exists(f):subprocess.run(['curl','-s','-o',f,f'https://raw.githubusercontent.com/freetiler/nasa-bluemarble/main/tiles/{Z}/{tx}/{ty}.jpeg'],check=True)
    big.paste(Image.open(f),((tx-tx0)*256,(ty-ty0)*256))
crop=big.crop((int(x0-tx0*256),int(y0-ty0*256),int(x1-tx0*256),int(y1-ty0*256)))
W=1100;s=W/crop.width;H=round(crop.height*s)
crop.resize((W,H),Image.LANCZOS).save('basemap_arabia.jpg',quality=82)
json.dump({"W":W,"H":H,"x0":int(x0),"y0":int(y0),"s":s,"N":N},open('basemap_arabia.json','w'))
print(W,H,s,crop.size)
