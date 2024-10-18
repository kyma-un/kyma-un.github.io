import webbrowser
import os
import time
import re

with open('_config.yml') as f:
	with open('_newconf.yml','w+') as fo:
		for r in f:
			if 'baseurl' not in r.lower():
				fo.write(r)
			else:
				fo.write(re.sub("'.+'","''",r))

os.remove('_config.yml')
os.rename('_newconf.yml','_config.yml')


os.system('jekyll serve')
time.sleep(10)
webbrowser.open('http://127.0.0.1:4000')
