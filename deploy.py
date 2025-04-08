import os,zipfile,re,datetime, shutil, platform

# Change config file to have root directory at FTP address

print('Re-writing config file...')

with open('_config.yml') as f:
	with open('_newconf.yml','w+') as fo:
		for r in f:
			if 'baseurl' not in r.lower():
				fo.write(r)
			else:
				#fo.write(re.sub("''","'http://epg.eng.ox.ac.uk/howey/'",r))
				fo.write(re.sub("''","'https://howey.eng.ox.ac.uk'",r))

os.remove('_config.yml')
os.rename('_newconf.yml','_config.yml')

# Build with jekyll

print('Building site...')
os.system('jekyll build')

# # Make backup of existing website
print('Backing up existing site...')

if 'LINUX' in platform.platform().upper():
	remote_dir = '/media/BILwebsite'
else:
	remote_dir = '//SVWEB05.eng.ox.ac.uk/HoweyGroup/'

bpfname =remote_dir + 'Backup_' + str(datetime.datetime.now().date())+'.zip'
#
zf=zipfile.ZipFile(bpfname,'w')
for dirname,subdirs,files in os.walk(remote_dir):
	if remote_dir not in dirname:
		zf.write(dirname)
	for filename in files:
		if '.zip' not in filename:
			zf.write(os.path.join(dirname,filename))

zf.close()
# # Copy built site to remote
print('Copying locally built site...')

dest = remote_dir
for root, dirs,files in os.walk('_site'):
	r=root.replace('_site\\','').replace('_site','')
	if 'LINUX' in platform.platform().upper():
		r=r[1:]

	if not os.path.exists(os.path.join(dest,r)):
		os.mkdir(os.path.join(dest,r))
	for f in files:
		if '.py' not in f:
			shutil.copy(os.path.join(root,f), os.path.join(dest,r,f))
			print('Copied ' + os.path.join(dest,r,f))

_ = input("All done!")
