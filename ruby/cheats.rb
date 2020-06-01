# **************************************************************************************************** 
#
# *cheats
# *creating a class
# *iteration
#
# **************************************************************************************************** 
# *cheats
#
# 3.class
# !false
# hello + 3.to_s
# hello * 3
# puts "this is a #{list[1]}"
# 'hayyp' << ' day'
# array[0] #=> 1
# array.first #=> 1
# array[12] #=> nil
# array.reverse
# array.reverse!
# array[1..3]
# array.include?(3)
# 5.even?
# 5.odd?
# 'hi'.capitalize
# 'hi'.downcase
# 'hi'.upcase!

# hashes
# hash = {yes: 'ya'}
# hash[:no] = 'na'

# puts hash[:no]

# puts hash.keys
# puts hash.values

# hash.delete(:no)
# hash.value?(3)
# hash.key?(:yes)
#
# if true
  # 'if statement'
# elsif false
  # 'else if, optional'
# else
  # 'else, also optional'
# end
#
# arr.each do |word|
#   puts word
# end
#
# result = arr.map do |word|
#   word + '!'
# end
#
# result = {}
# hash.each do |key, value|
#   result[key] = value + '_value'
# end
#
# result = []
# arr.each_with_index do |value, index|
#   result.push(value + '_' + index.to_s) 
# end
#
#
# ****************************************************************************************************
# *creating a class
# ****************************************************************************************************
#
# 
# number = 9
# case number
#   when 8
#     <statement>
#   when < 4
#     <statement>
#   when 6..10 // you can also do ranges
#   when number < 10(wont work) // but you can't do control expressions
#   else
#     <statement>
# end
#
# def surround
#   puts '{'
#   yield
#   puts '}'
# end

# surround { puts 'hello world' }#
#
#def guests(&block)
  # block.call 'some_argument'
# end
#

# **************************************************************************************************** 
# *iteration
# **************************************************************************************************** 

# result = numsArr.reduce { |a, b| a.to_i + b.to_i }
#
# result = string.map do |word|
#   word + '!'
# end
