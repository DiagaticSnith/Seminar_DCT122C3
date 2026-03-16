from dataclasses import dataclass
from unittest import TestCase, main


class Singleton(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


@dataclass
class Environment(metaclass=Singleton):
    name: str = 'Production'
    version: int = 1


if __name__ == "__main__":
    main()

class TestSingleton(TestCase):
    def test_singleton_should_return_same_instance(self):
        @dataclass
        class A(metaclass=Singleton):
            a: int = 0

        self.assertIs(A(2), A())