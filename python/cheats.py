# ****************************************************************************************************

# *cheats
# *creating a class

# ****************************************************************************************************

# for value in list:
# for value in string:
# for i in range(min, max, step):
# while i < 100:
#     print i
#     i += 3
# 'hi ' + str(5)
# type(value) == int
# len(li)
# print "{0} is so cool{2}".format('This', '?', '!') 
# print "{first} is so cool{third}".format(first='This', second='?', third='!') 
# bool('')
# li.append()        // mutates the original list
# li.pop()
# li[2] = 'great!'
# li[start:end:step]
# del li[2]
# li.remove('hi')    // removes first occurance of 'hi'
# li.insert(2, 'hi') // (mutates the original) inserts 'hi' in the 2 position and shifts everything to the right
# list.li('hi')      // gives index of first occurance of 'hi'
# list.reverse()     // mutates the original does not return a value
# list.index('hi')   // returns the index number
# 'hi' in li         // returns boolean
# list.extend([1, 2])// mutates the original does not return a value (adds the two arrays together
# list.sort()        // does not return a value -> mutates the original list
# sorted(list)       // returns the sorted list but does not mutate the original list
# tup = (1, 2, 3)    // immutable list (you can read but not wirte)
# new_tup = tup + (4, 5, 6) 
#                    // you can add to a tup though
#                    // if you save the result to a new variable
# dict = {"one": 1, "two": 2, "three": 3}
# dict['one']
# dict.keys()
# dict.values()
# dict.items()       // key value pairs in a list
# 'one' in dict      // checks keys but not values
# set([2, 3, 8, 8])  // just like a list but no duplicates
# {2, 3, 8, 8}       // alternate set definition => set([2, 3, 8])

# print li[1:3]  # => [2, 4]
# print li[2:]  # => [4, 3]
# print li[:3]  # => [1, 2, 4]
# print li[::2]  # =>[1, 4]
# print li[::-1]  # => [3, 4, 2, 1]

# value = raw_input("Enter some data: ")

# is vs ==
#   is is better suited for comparing objects
#   is compares object identity (not useful for primitives)

# num = 7
# if (num > 6 and num < 9):
#     print 'success1'
# elif (num > 6 or num < 9):
#     print 'success2'

# # print math.ceil(22.22)
# # print math.floor(22.22)


# ****************************************************************************************************
# *creating a class
# ****************************************************************************************************


# class Human(object):
#     species = "sapien"    #expossed

#     def __init__(self, name):
#         self.name = name  #expossed
#         self.age = 0      #expossed

#     def say(self, msg):
#         return "{0}: {1}".format(self.name, msg)

#     @classmethod
#     def get_species(cls):
#         return cls.species

#     @staticmethod
#     def grunt():
#         return "*grunt*"

#     @property
#     def age(self):
#         return self._age

#     @age.setter
#     def age(self, age):
#         self._age = age

#     @age.deleter
#     def age(self):
#         del self._age

# i = Human(name="nate")

# i.name = 'bill'
# print i.say('hi')
# print i.grunt() 
# i.age = 44
# print i.age
# del i.age

# import math
# print dir(math)
# print math.sqrt(22)

# from math import ceil, floor   // imports just ceil and floor

