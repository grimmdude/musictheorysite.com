#!/bin/bash

for i in *.png; do
	printf "$i\n"
	convert "$i" -strip -alpha Remove "optimized/$i"
done