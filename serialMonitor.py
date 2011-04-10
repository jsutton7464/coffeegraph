import serial
import binascii
import sys
import time
import httplib

#s = serial.Serial('/dev/tty.usbserial-A9007MdP', 9600)
s = serial.Serial('/dev/ttyUSB0', 9600)
h = httplib.HTTPConnection("localhost:8081")
t0 = time.time()

while 1:
    try:
        message = s.readline().strip()
        if message.startswith("#"): continue
        print '#',message
        points = message.split(",")
        if len(points) < 3: continue
        point = points[2]
        print time.time()-t0, point
        url = "/data?%s" % point
        h.request("GET", url)
        r = h.getresponse()
        r.read()
    except KeyboardInterrupt:
		exit()
    except:
        print "generic problem"
    #time.sleep(0.4)    
