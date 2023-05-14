We are happy to inform you about a new plugin for Unturned:
#Gitankillfeed premium!

This plugin provides to everyone ability to see all server's player's deaths.
* Customization: you can set server's logo and header's text
* Сustomizable font-size and text's colors
* Displays, how player were killed, cause of his death, with icons and other info.


## Configuration
Default config
```
<?xml version="1.0" encoding="utf-8"?>
<gitankillfeedConfiguration xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
#how long the kill information time will be displayed
  <cooldown>8</cooldown>
#set value above 0
  <key>843</key>
#the color of killfeed's lines
  <LinesColor>#323232</LinesColor>
#your title
  <title>title - edit configuration.xml</title>
#bool. Display logo, or not
  <showTitle>false</showTitle>
#title's color
  <titleColor>#FFF</titleColor>
#source with custom icons <baseURL>https://raw.githubusercontent.com/Schildkrote-Communist/MiliosaSite/main/images/</baseURL>
#the size of killfeed's lines
  <fontSize>25</fontSize>
#for identifying UI effect with the plugin
  <EffectID>32045</EffectID>
#maximum number of plugin's lines
  <maxLineKillfeed>6</maxLineKillfeed>
</gitankillfeedConfiguration>
```

## Setting up your your custom icon:
Put your .png images into github repos, like that
https://raw.githubusercontent.com/YourName/YourRepo/path_to_your_folder
If you want to specify your own icons, they're MUST have this names
torso.png --torso icon (killed in torso part)
spine.png --spine icon (killed in spine part)
skull.png -- skull part icon (killed in skull)
leg.png --leg icon (killed in leg)
kill.png -- bullets icon (player was shot down)
back.png -- back icon (killed in back part)
arm.png -- arm icon (killed in arm)
ZOMBIE.png - (death from zombie) zombie icon
WATER.png -- death from thirst
SUICIDE.png -- player kills himself
SPARK.png -- death from electricity (&electrical gian zombie)
SHRED.png -- death from barbed wires, fences, etc...
SENTRY.png -- shot by sentry
ROADKILL.png --hit by a car to death
PUNCH.png --killed by another player with punch
MELT.png - when player melt in acid
MELEE.png -- killed with cold weapon
INFECTION.png -- died from being infected
HYPER.png --died from zombie at full noon
FREEZE.png -- froze to death
FOOD.png -- died from starvation
CHARGE.png -- was exploded by demolition charge, car explosion, etc...
BURNING.png -- was burnt down by flamer zombie, etc...
BREATH.png -- drowned
BOULDER.png -- smashed by a rock
BONE.png -- fell from high place
BLOOD.png --bled out
ANIMAL.png -- bitten to death by animals (like bears)
ACID.png -- melt in acid
