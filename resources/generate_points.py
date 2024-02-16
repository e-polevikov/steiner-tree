import random


def main():
    max_x, max_y = 24, 10
    points = set()
    num_points = 16

    while len(points) != num_points:
        point = (random.randint(1, max_x - 1), random.randint(1, max_y - 1))
        points.add(point)
    
    points = "\n".join(list(map(
        lambda point: "{" + f"x: {point[0]}, y: {point[1]}" + "},",
        sorted(points)
    )))

    print(points)


if __name__ == "__main__":
    main()
