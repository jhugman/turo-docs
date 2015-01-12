turo
====
A small calculator language. Implemented in javascript.

The parser is implemented using pegjs.

The language itself, is still very much in flux.

Built in functionality
======================
When using any turo apps, the files in the `includes/` directory have already been included. So you have built-in units available.

When using the desktop or repl interfaces, the whole language is exposed.

Units
-----
We rarely calculate with pure abstract numbers. Most of things we are calculating are things with dimensions that we measure with units.

However, units are a complicated mix of history and convention, and even doing the simplest of arithmetic with them is tricky with conventional languages and calculators.

```
 >> width = 6ft + 1 inch
... width = 6 ft + 1 inch = 6.0833333333333 ft
```

Once you're calculating with multiples, most people give in to estimating conversions, where extra error comes in. Turo keeps track of this for you.
```
 >> length = 120m
... length = 120 m = 120 m
 >> area = width * length
... area = width * length = 222.504 m^2
 >> area in acre
... area in acre = 0.05498193579797 acre
```

More exotic operators also work with units:
```
 >> sqrt(area) in m
... sqrt(area) in m = 14.916567969878 m
```

Error detection is brilliant, but error reporting is best effort at best. You can only add and subtract units of the same dimension.

```
 >> 1 m + 1 kg
... Eval problem, DIMENSION_MISMATCH: 1 m + 1 kg
                                      ^^^^^^^^^^
 >> 2 / (3 - 9 * 1/3)
... Eval problem, DIVIDE_BY_ZERO: 2 / (3 - 9 * 1/3)
                                      ^^^^^^^^^^^^^                                      
```
Variables
---------
You can define and use variables, just by starting your expression.

 * constants defined: `e`, `pi` and `g`.

Operators
---------
 * simple arithmetic operators
 * trigonometric functions: sin, cos, tan, asin, acos, atan. You can specify `deg` or `radian` as units.
 * logarithms (`log` and `ln`), powers (`^`, e.g. `e^pi`, `10^3`) 

Making new units
----------------
Units give expressions context to help us write and understand them.

```
unit GBP : Currency
unit person : People

salary = 50000 GBP per person per year
attendees = 5 person
duration = 2h
cost_of_meeting = attendees * salary * duration
```

You can also make new units, relative to an existing unit.
```
 >> unit parsec : 1e31 m
```

This definition tells turo that `parsec` is something that has the same dimensionality as `m` i.e. `Length`, and how to convert between `parsec` and `m`. By doing this, now turo knows how to convert between `parsec` and any other unit of dimension `Length`.

```
 >> 1 parsec in km
... 1 parsec in km = 1e+28 km
```

To be clear, George, parsecs are a unit of distance.
```
 >> kessel_run = 12 parsec
... kessel_run = 12 parsec = 12 parsec
 >> kessel_run in mile
... kessel_run in mile = 7.456454306848e+28 mile
 >> kessel_run in year
... Eval problem, DIMENSION_MISMATCH: kessel_run in year
                                      ^^^^^^^^^^^^^^^^^^
```


More unit definition language
--
You can name compound dimensions when you define the corresponding unit, after the colon, but before the units it being defined as: 

```
unit kph : Speed, 1 km/h
```

Once this has been defined, anything that is defined in terms of `Length/Time` is identified as `Speed`.

Where synonyms of the same unit exist, turo will parse this, but not do anything with it. This is an unimplemented future feature.

```
unit 3 ft foot feet : yd;
```

Finally, to make managing vast number of units easier, for example making a keyboard from the units we've defined, you can define unit schemes: these are names of units systems.

```
unit yard (Imperial) : 1 m;
```

Units can belong to more than one unit scheme, and can be defined all at once, or by adding more unit schemes later on.

```
unit m (SI Metric) : Length
```

or: 

```
unit m (SI) : Length
unit m (Metric)
```

Unless you're adding a unit scheme, the unit scheme will propogate to the new units:

```
unit Pa pascal (Science) : Pressure, 1 N/m^2
unit kPa kilopascal : 1000 Pa
```

Now, `kPa` will have the same dimension and unit scheme as `Pa`.

Units without unit schemes will appear in all unit schemes. e.g.

```
unit s seconds : Time
```


Possible next steps for language
================================
 * Boolean types and operators to generate them from numbers e.g. p >= q; and use them e.g. a AND b, pattern matching (switch statements)
 * Sequence types. Matlab has some interesting syntax here for defining ranges.
 * String types. Principally for generating messages with switch statements and booleans. 
 * More flexible unit conversion: 
   - 1 m in imperial -> 3 ft 3 in
   - 1 N in ft lb wk -> 1 lb ft/wk^2. This is principally to help builders of non-keyboard based UIs.
 * functions. Bonus marks: definition language for functions. There are great reasons to do this, but UI would be difficult to implement, and don't want to get too bogged down in implementation, and/or theory. Scala has some nice syntax to chew on, especially around anonymous variables.
 * 'prompt' tokens. In all likelihood, this would be a lightweight token which decorates an existing value, which becomes the default.
