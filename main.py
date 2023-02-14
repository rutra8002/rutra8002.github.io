import math


class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f'({self.x}, {self.y})'

    def distance_from_centre(self):
        return math.sqrt(self.x ** 2 + self.y ** 2)

    def cwiartka(self):
        if self.x == 0 and self.y == 0:
            return "na początku układu współrzędnych"
        elif self.x == 0:
            return "na osi Y"
        elif self.y == 0:
            return "na osi X"
        elif self.x > 0 and self.y > 0:
            return "I"
        elif self.x < 0 and self.y > 0:
            return "II"
        elif self.x < 0 and self.y < 0:
            return "III"
        else:
            return "IV"

    def czy_w_kole(self, promien):
        return self.distance_from_centre() <= promien

    def odleglosc_do(self, inny_punkt):
        return math.sqrt((self.x - inny_punkt.x) ** 2 + (self.y - inny_punkt.y) ** 2)


punkt = Point(3, 4)
print(punkt)
print(punkt.distance_from_centre())
print(punkt.cwiartka())
print(punkt.czy_w_kole(5))
inny_punkt = Point(2, 3)
print(punkt.odleglosc_do(inny_punkt))

class Fraction:
    def __init__(self, numerator, denominator):
        self.numerator = numerator
        self.denominator = denominator
        self.skracanie()

    def __str__(self):
        return f'{self.numerator}/{self.denominator}'

    def between_minus_one_and_one(self):
        value = self.numerator / self.denominator
        return value > -1 and value < 1

    def multiply(self, other):
        new_num = self.numerator * other.numerator
        new_denominator = self.denominator * other.denominator
        return Fraction(new_num, new_denominator)

    def add(self, other):
        new_denominator = self.denominator * other.denominator
        new_num = (self.numerator * other.denominator) + (other.numerator * self.denominator)
        return Fraction(new_num, new_denominator)

    def gcd(self, a, b):
        if b == 0:
            return a
        else:
            return self.gcd(b, a % b)

    def skracanie(self):
        gcd = self.gcd(self.numerator, self.denominator)
        self.numerator //= gcd
        self.denominator //= gcd




print(Fraction(2, 3))
print(Fraction(3, 4))
print(Fraction(2, 3).between_minus_one_and_one())
print(Fraction(3, 4).between_minus_one_and_one())
print(Fraction(2, 3).multiply(Fraction(3, 4)))
print(Fraction(2, 3).add(Fraction(3, 4)))
print(Fraction(10, 15))
print(Fraction(3, 9).gcd(99, 9))





class Circle:
    def __init__(self, x, y, radius, color):
        self.x = x
        self.y = y
        self.radius = radius
        self.color = color

    def __str__(self):
        return f"Circle with center at ({self.x}, {self.y}), radius {self.radius} and color {self.color}"

    def is_on_screen(self):
        return (self.x + self.radius <= 1920 and self.x - self.radius >= 0 and
                self.y + self.radius <= 1080 and self.y - self.radius >= 0)

    def distance_from_another_circle(self, other):
        dx = self.x - other.x
        dy = self.y - other.y
        return math.sqrt(dx * dx + dy * dy) - self.radius - other.radius

    def intersects_another_circle(self, other):
        distance = self.distance_from_another_circle(other)
        return distance < 0
# tworzenie obiektów klasy Circle
circle1 = Circle(400, 400, 100, "red")
circle2 = Circle(600, 600, 50, "blue")

# wyświetlanie obiektów
print(circle1)
print(circle2)

# sprawdzanie, czy okrąg mieści się na ekranie
print(circle1.is_on_screen())
print(circle2.is_on_screen())

# obliczanie odległości między okręgami
distance = circle1.distance_from_another_circle(circle2)
print(f"Odległość między okręgami wynosi {distance}")

# sprawdzanie, czy okręgi przecinają się
intersects = circle1.intersects_another_circle(circle2)
if intersects:
    print("Okręgi przecinają się")
else:
    print("Okręgi nie przecinają się")
