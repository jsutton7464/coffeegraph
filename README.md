Real-time graphing of Silvia Boiler Temp
===

See [http://nicolas.kruchten.com/content/2011/04/graphing-siliva-temperature-on-ipad/] for the motivation behind this system, as well as a video of it in operation.

What does it do? How does it work? How do I run it?
---

This is a pretty simple hacked-together system for taking temperature samples from the boiler of my Rancilio Silvia espresso machine, and graphing them real-time on my iPad, mostly to see if I could do it. 

To run it, first launch the web server: `coffee wsgraph.coffee` and then point your modern browser to `http://localhost:8081/`. You should then see an empty graph scrolling by.

Then launch the python script which shuffles the data from the USB serial connection to the web server: `python serialMonitor.py`. If you have some sort of serial device attached via USB that sends temperature samples every once in a while, they should appear on the graph in your browser.

If you actually want to run this, you will probably want to drop me an email for more details :)

Dependencies
---

A modified version of [Smoothie Charts](http://github.com/joewalnes/smoothie) is included, and for the node packages, run:

    npm install coffee-script
    npm install paperboy
    npm install socket.io


