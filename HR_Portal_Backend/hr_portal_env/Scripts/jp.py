#!C:\Users\joash\Desktop\Hr_portal_final\hr_portal\hr_portal_env\Scripts\python.exe

import sys
import json
import argparse
from pprint import pformat

import jmespath
from jmespath import exceptions


def process_data():
    """
    Main function to parse input, evaluate JMESPath expressions,
    and handle optional AST output or file input.
    """
    # Set up argument parsing for the script
    arg_parser = argparse.ArgumentParser(description="Evaluate JMESPath expressions on JSON data.")
    arg_parser.add_argument('query', help="JMESPath expression to evaluate.")
    arg_parser.add_argument('-f', '--file', help="Path to the JSON input file. If not provided, reads from stdin.")
    arg_parser.add_argument('--show-ast', action='store_true', help="Display the abstract syntax tree (AST) of the expression.")
    
    # Parse arguments
    arguments = arg_parser.parse_args()
    jmes_expression = arguments.query

    if arguments.show_ast:
        # If AST flag is provided, display the AST and exit
        compiled_expression = jmespath.compile(jmes_expression)
        sys.stdout.write(pformat(compiled_expression.parsed))
        sys.stdout.write('\n')
        return 0

    # Load JSON data from a file or stdin
    if arguments.file:
        with open(arguments.file, 'r') as file_input:
            json_data = json.load(file_input)
    else:
        json_data = json.loads(sys.stdin.read())

    try:
        # Evaluate the JMESPath expression
        result = jmespath.search(jmes_expression, json_data)
        sys.stdout.write(json.dumps(result, indent=4, ensure_ascii=False))
        sys.stdout.write('\n')
    except exceptions.ArityError as error:
        sys.stderr.write(f"Error: Incorrect function arity - {error}\n")
        return 1
    except exceptions.JMESPathTypeError as error:
        sys.stderr.write(f"Error: Type mismatch - {error}\n")
        return 1
    except exceptions.UnknownFunctionError as error:
        sys.stderr.write(f"Error: Unknown function - {error}\n")
        return 1
    except exceptions.ParseError as error:
        sys.stderr.write(f"Error: Syntax error in expression - {error}\n")
        return 1


if __name__ == '__main__':
    # Entry point of the script
    sys.exit(process_data())