# Installing Theos on Windows 10

# Step 1 (Setting up Windows for WSL Ubuntu)

 1. Make sure your Windows is up to date. This only works on Windows 10 so make sure you have the **latest** Windows 10 update.
 2. Open Windows Powershell (**NOT** Command Prompt).
 3. Inside Powershell run the following command to enable WSL(Windows Subsystem Linux). This feature is harmless and won't do weird things to your computer on its own.
 
 	`Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux`
 
 4. Reboot your computer after this command has been ran.
 5. Install the [Ubuntu app](http://prntscr.com/n2vz3e) from the Microsoft Store app.
 6. Once the download has finished select "Launch" from the Microsoft Store Page and wait for the Ubuntu app to finish its job.
 7. When asked for a UNIX Username and Password, enter in whatever you may wish. 
 
 ```
 Username: silent
 Password: toor
 ```
 
 9. You've now successfully installed Ubuntu! You can launch it at anytime from the Start Menu in Windows!

**Tip**: If the terminal window ever asks for your password, it is asking for the password you set up in Ubuntu **NOT** your Windows password!

# Step 2 (Setting up the Theos Environment)

**1. Installing Theos Dependencies**

- These two commands will install all the dependencies needed for Theos to work properly.

```
sudo apt-get update
sudo apt-get install -y build-essential git unzip libio-compress-perl
```

**2. Setting up the $THEOS environment variables**

- These five commands will set environment variables that Theos uses to know where things are and where to execute them from and things of that such.

```
echo export THEOS="/opt/theos" >> ~/.bashrc
echo alias nic="\$THEOS/bin/nic.pl" >> ~/.bashrc
echo "umask 0022" >> ~/.bashrc
source ~/.bashrc
```

**3. Installing Theos, the Toolchain, and the SDK**

- This command installs Theos to the **$THEOS** directory.

`sudo git clone --recursive git://github.com/theos/theos.git $THEOS`

- These two commands download the toolchain needed and unzip and install it to the Toolchain directory.

```
cd $THEOS/toolchain && sudo wget https://developer.angelxwind.net/Linux/ios-toolchain_clang%2bllvm%2bld64_latest_linux_x86_64.zip -O LinuxToolchain.zip
sudo unzip LinuxToolchain.zip && sudo rm -f LinuxToolchain.zip
```

- Downloads the SDK needed. The toolchain doesn't work with 9.3+ SDK's so we're downloading the 9.2 one instead.

```
cd $THEOS/sdks && wget http://resources.airnativeextensions.com/ios/iPhoneOS9.2.sdk.zip -O sdk.zip
sudo unzip sdk.zip && sudo rm -f sdk.zip
```

**4. Installing libstdc++**

- Downloads and installs libstdc++ which is needed for building.

```
cd /tmp && wget http://security.ubuntu.com/ubuntu/pool/main/g/gcc-5/libstdc++6_5.4.0-6ubuntu1~16.04.10_amd64.deb -O libstdc++.deb
dpkg-deb -x libstdc++.deb libstdc++
sudo cp libstdc++/usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.21 /usr/lib/x86_64-linux-gnu/
cd /usr/lib/x86_64-linux-gnu/
sudo ln -sf libstdc++.so.6.0.21 libstdc++.so.6
```

**5. Fixing fakeroot and permission problems**

- Fixes any future permission problems you may or may not have.

```
sudo sed -i 's/\$(FAKEROOT) -r/fakeroot-tcp/g'  $THEOS/makefiles/package/deb.mk
sudo chown -R $(id -u):$(id -g) $THEOS
```

# Step 3 (Getting to work)

You're done now! You can start making packages by typing in "nic"! To make and package your tweaks and such type in  "make package"! You can also set it up so you can remotely install the tweak to your device by using "make package install"! Just look around the [Theos Wiki](https://github.com/theos/theos/wiki) for some more stuff!

**Tip:** Your stuff should be located in
"**C:\Users\%USERNAME%\AppData\Local\Packages\CanonicalGroupLimited.UbuntuonWindows_xxxxxx\LocalState\rootfs**"