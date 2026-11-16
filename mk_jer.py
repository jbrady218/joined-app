# Builds a shaded-relief background for the Jerusalem plan. The terrain is modeled from the known hills and valleys (approximate).
import numpy as np, math
from PIL import Image, ImageFilter
import matplotlib; matplotlib.use('Agg'); import matplotlib.pyplot as plt
S=2;W,H=680*S,800*S
lon=35.2245+np.arange(W)/S/37840; lat=31.7840-np.arange(H)/S/44360
LON,LAT=np.meshgrid(lon,lat)
mx=(LON-35.2245)*94600; my=(LAT-31.7660)*110900   # meters
def P(l,a):return ((l-35.2245)*94600,(a-31.7660)*110900)
def g(l,a,h,r,rx=None):x,y=P(l,a);rx=rx or r;return h*np.exp(-(((mx-x)/rx)**2+((my-y)/r)**2))
# regional surface: high to the north and west, Mount of Olives to the east
z=700+0.035*(my-900)-0.03*(mx-700)
z+=g(35.2290,31.7765,55,420,380)      # western hill (Mount Zion), ~770 m
z+=g(35.2265,31.7830,40,500)          # northwest plateau
z+=g(35.2354,31.7781,42,170,120)      # temple hill (~743 m)
z+=g(35.2357,31.7735,10,260,70)       # City of David spur
z+=g(35.2460,31.7790,120,450,260)     # Mount of Olives (~800 m)
z+=g(35.2440,31.7690,40,300,200)      # Mount of Corruption / Silwan ridge
def dist(poly):
    d=np.full(mx.shape,1e9);t=np.zeros(mx.shape)
    L=0;segs=[]
    pts=[P(*p) for p in poly]
    tot=sum(math.dist(pts[i],pts[i+1]) for i in range(len(pts)-1))
    for i in range(len(pts)-1):
        (x0,y0),(x1,y1)=pts[i],pts[i+1];dx,dy=x1-x0,y1-y0;l2=dx*dx+dy*dy
        u=np.clip(((mx-x0)*dx+(my-y0)*dy)/l2,0,1);dd=np.hypot(mx-(x0+u*dx),my-(y0+u*dy))
        m=dd<d;d=np.where(m,dd,d);t=np.where(m,(L+u*math.sqrt(l2))/tot,t);L+=math.sqrt(l2)
    return d,t
def smin(a,b,k=10):h=np.clip(0.5+0.5*(b-a)/k,0,1);return b*(1-h)+a*h-k*h*(1-h)
from scipy.ndimage import gaussian_filter as GF
def cr(poly,n=12):
    p=[poly[0]]+list(poly)+[poly[-1]];out=[]
    for i in range(1,len(p)-2):
        a,b,c,d=map(np.array,(p[i-1],p[i],p[i+1],p[i+2]))
        for u in np.linspace(0,1,n,endpoint=False):out.append(tuple(0.5*((2*b)+(-a+c)*u+(2*a-5*b+4*c-d)*u*u+(-a+3*b-3*c+d)*u**3)))
    out.append(poly[-1]);return out
def valley(poly,fl,k):
    d,t=dist(cr(poly))
    # floor height interpolated along the valley's length, then smoothed so there are no seams
    ts=np.linspace(0,1,len(fl));f=GF(np.interp(t,ts,fl),25)
    return f+k*np.sqrt(d**2+22**2)-k*22
kidron=[(35.2386,31.7880),(35.2383,31.7800),(35.2379,31.7770),(35.2373,31.7735),(35.2364,31.7702),(35.2357,31.7683),(35.2352,31.7630)]
hinnom=[(35.2236,31.7850),(35.2259,31.7775),(35.2266,31.7742),(35.2278,31.7711),(35.2303,31.7692),(35.2333,31.7686),(35.2356,31.7684)]
tyro=[(35.2300,31.7860),(35.2318,31.7792),(35.2331,31.7762),(35.2339,31.7732),(35.2344,31.7708),(35.2352,31.7686)]
for poly,fl,k in [(kidron,[715,690,672,650,622,606,585],0.5),(hinnom,[760,742,728,700,660,630,606],0.5),(tyro,[752,728,700,672,640,612],0.42)]:
    z=smin(z,valley(poly,fl,k),10)
from scipy.ndimage import gaussian_filter
rng=np.random.default_rng(7)
z=gaussian_filter(z,4)+sum(gaussian_filter(rng.normal(0,1,z.shape),sg)*a for sg,a in [(40,400),(14,7),(5,0.7)])
np.save('jer_z.npy',z)
print('elev range',z.min().round(),z.max().round())
# hillshade
dy,dx=np.gradient(z,1/(S*0.4),1/(S*0.4))   # meters per pixel = 1/(S*0.4)
az,alt=math.radians(315),math.radians(40)
slope=np.arctan(np.hypot(dx,dy)*1.6);aspect=np.arctan2(-dx,dy)
hs=np.sin(alt)*np.cos(slope)+np.cos(alt)*np.sin(slope)*np.cos(az-aspect)
hs=np.clip(hs,0,1)
# hypsometric tint: low = sage, high = warm sand
t=(np.clip((z-590)/190,0,1)**0.8)[...,None]
low=np.array([178,186,158]);high=np.array([241,228,194])
col=low*(1-t)+high*t
shade=(0.42+0.7*hs)[...,None]
img=np.clip(col*shade,0,255).astype(np.uint8)
im=Image.fromarray(img)
# contours
fig=plt.figure(figsize=(W/100,H/100),dpi=100);ax=fig.add_axes([0,0,1,1]);ax.axis('off')
ax.imshow(img,extent=[0,W,H,0])
lv=np.arange(560,840,10)
ax.contour(np.arange(W),np.arange(H),z,levels=lv,colors=[(0.42,0.32,0.18,0.22)],linewidths=0.6)
ax.contour(np.arange(W),np.arange(H),z,levels=np.arange(600,850,50),colors=[(0.42,0.32,0.18,0.45)],linewidths=1.1)
ax.set_xlim(0,W);ax.set_ylim(H,0)
fig.savefig('jer_bg.png',dpi=100);plt.close(fig)
Image.open('jer_bg.png').convert('RGB').save('jer_bg.jpg',quality=80)
import os;print(os.path.getsize('jer_bg.jpg'))
