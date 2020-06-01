import heapq
 
li = [5, 7, 9, 1, 3]
 
heapq.heapify(li)
print(li)

heapq.heappush(li,4)
print(li)
 
heapq.heappop(li)
print(li)

largest = heapq.nlargest(3, li)
print(largest)

smallest = heapq.nsmallest(3, li)
print(smallest)

print(li)
 

